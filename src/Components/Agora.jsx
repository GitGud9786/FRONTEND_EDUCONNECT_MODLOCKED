import AgoraRTC from "agora-rtc-sdk-ng";

const APP_ID = "your-app-id";
const TOKEN = null;  // Use a valid token in production
const CHANNEL = "test-channel";

// Create the Agora client
let client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

// Event listener for remote users publishing streams
client.on("user-published", async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    console.log("Subscribed to remote user:", user.uid);

    if (mediaType === "video") {
        let remoteTrack = user.videoTrack;
        remoteTrack.play(`remote-user-${user.uid}`);
    }
});

// Function to join the channel and start local video
async function joinChannel() {
    await client.join(APP_ID, CHANNEL, TOKEN, null);
    console.log("Joined channel:", CHANNEL);

    // Start local video after joining
    startVideo();
}

// Function to start local video
async function startVideo() {
    let localTrack = await AgoraRTC.createCameraVideoTrack();
    localTrack.play("video-container");
    await client.publish([localTrack]);
    console.log("Video published!");
}

// Function to leave the channel
async function leaveChannel() {
    await client.leave();
    console.log("Left the channel");
}

// Example: Event listener for leaving the channel
document.getElementById("leaveButton").addEventListener("click", leaveChannel);

// Start the process by joining the channel when your app loads
joinChannel();
