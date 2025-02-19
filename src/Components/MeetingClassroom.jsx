import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import '../styles/MeetingClassroom.css';

const APP_ID = '5a3ef53cf05c49d5a7e6ad24ba307cdb';
const TOKEN = null; // Use a token for production
const CHANNEL = 'test-channel';

const MeetingPage = () => {
  const clientRef = useRef(null);
  const localTrackRef = useRef(null);
  const audioTrackRef = useRef(null);
  const screenTrackRef = useRef(null);

  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isVideoButtonDisabled, setIsVideoButtonDisabled] = useState(false);

  useEffect(() => {
    const joinCall = async () => {
      try {
        clientRef.current = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        const client = clientRef.current;
        await client.join(APP_ID, CHANNEL, TOKEN, null);
        console.log("Joined channel:", CHANNEL);

        // Create and play video track
        const videoTrack = await AgoraRTC.createCameraVideoTrack();
        localTrackRef.current = videoTrack;
        videoTrack.play("local-player");

        // Create and publish audio track
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        audioTrackRef.current = audioTrack;

        await client.publish([videoTrack, audioTrack]);
        console.log("Local video & audio published!");

        // Handle remote user joining
        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          if (mediaType === "video") {
            let remoteContainer = document.createElement("div");
            remoteContainer.id = `remote-player-${user.uid}`;
            remoteContainer.className = "remote-video";
            document.body.appendChild(remoteContainer);
            user.videoTrack.play(remoteContainer.id);
          }
        });
      } catch (error) {
        console.error("Error joining call:", error);
      }
    };

    joinCall();

    return () => {
      if (clientRef.current) {
        clientRef.current.leave();
      }
    };
  }, []);

  const toggleVideo = async () => {
    if (isScreenSharing) return; // Prevent toggling video while screen sharing
  
    if (videoEnabled) {
      // Stop and close the video track
      if (localTrackRef.current) {
        await clientRef.current.unpublish(localTrackRef.current);
        localTrackRef.current.stop();
        localTrackRef.current.close();
        localTrackRef.current = null; // Clear the reference
      }
    } else {
      // Recreate and publish the video track
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      localTrackRef.current = videoTrack;
      await clientRef.current.publish(videoTrack);
      videoTrack.play("local-player");
    }
  
    setVideoEnabled(!videoEnabled);
  };
  
  

  // Toggle Audio
  const toggleAudio = async () => {
    if (audioTrackRef.current) {
      await audioTrackRef.current.setEnabled(!audioEnabled);
      setAudioEnabled(!audioEnabled);
    }
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenTrack = await AgoraRTC.createScreenVideoTrack({
          encoderConfig: "1080p",
          optimizationMode: "detail",
        });
        screenTrackRef.current = screenTrack;
  
        await clientRef.current.unpublish(localTrackRef.current);
        await clientRef.current.publish(screenTrack);
        screenTrack.play("local-player");
  
        if (localTrackRef.current) {
          localTrackRef.current.stop();
          localTrackRef.current.close();
        }
  
        setIsScreenSharing(true);
        setVideoEnabled(false);
        setIsVideoButtonDisabled(true); // Ensure button is disabled
      } catch (error) {
        console.error("Error sharing screen:", error);
      }
    } else {
      try {
        await clientRef.current.unpublish(screenTrackRef.current);
        screenTrackRef.current.stop();
        screenTrackRef.current.close();
  
        const videoTrack = await AgoraRTC.createCameraVideoTrack();
        localTrackRef.current = videoTrack;
        await clientRef.current.publish(videoTrack);
        videoTrack.play("local-player");
  
        setIsScreenSharing(false);
        setVideoEnabled(true);
        setIsVideoButtonDisabled(false); // Re-enable button when screen sharing stops
      } catch (error) {
        console.error("Error stopping screen sharing:", error);
      }
    }
  };
  

  // Leave Meeting
  const leaveMeeting = () => {
    if (clientRef.current) {
      clientRef.current.leave();
    }
    window.close(); // Close the meeting tab
  };

  return (
    <div>
      <div className="meeting-text">
        <h2>Video Room</h2>
      </div>
      <div className="meeting-container">
        <div id="local-player"></div>
      </div>

      {/* Control Buttons */}
      <div className="meeting-controls">
        <button
          onClick={toggleVideo}
          className="control-button"
          disabled={isVideoButtonDisabled} // Disable the video button while screen sharing
        >
          {isScreenSharing
            ? "Turn Video On" // If screen sharing, show "Turn Video On"
            : videoEnabled
            ? "Turn Video Off"
            : "Turn Video On"
          }
        </button>
        <button onClick={toggleAudio} className="control-button">
          {audioEnabled ? "Mute Mic" : "Unmute Mic"}
        </button>
        <button onClick={toggleScreenShare} className="control-button screen-share">
          {isScreenSharing ? "Stop Sharing" : "Share Screen"}
        </button>
        <button onClick={leaveMeeting} className="control-button leave-button">
          Leave Meeting
        </button>
      </div>
    </div>
  );
};

export default MeetingPage;
