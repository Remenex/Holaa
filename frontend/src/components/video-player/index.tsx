"use client";
import { useSocket } from "@/hooks/socket";
import { getRoom, getRoomMemebers } from "@/services/rooms.service";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Chat from "../lib/chat";
import Icon from "../lib/icon";
import { ModernIcon } from "../lib/modern-icon";
import { CurrentlyWatchingComponent } from "../lib/player/currently-watching-component";
import { AnimatedTooltip } from "../ui/tooltip";
import "./css/custom-slider.css";

export function VideoPlayer() {
  const { movie_id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const roomId = searchParams.get("room");
  const notify = searchParams.get("notify");

  const roomsSocket = useSocket("rooms");

  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);

  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState<
    "open" | "closed" | "transparent"
  >("closed");

  const [isFullScreen, setIsFullScreen] = useState(false);

  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [currentlyWatchUsers, setCurrentlyWatchUsers] = useState<User[]>([]);

  const [room, setRoom] = useState<Room>();

  const handleFriendsOpen = () => {
    setIsFriendsOpen(!isFriendsOpen);
  };

  const handleIsMessageBoxOpen = (value: "open" | "closed" | "transparent") => {
    setIsMessageBoxOpen(value);
  };

  const handleMouseMove = () => {
    // setControlsVisible(true);
    // if (timeoutIdRef.current) {
    //   clearTimeout(timeoutIdRef.current);
    // }
    // timeoutIdRef.current = setTimeout(() => {
    //   setControlsVisible(false);
    // }, 3000);
  };

  useEffect(() => {
    if (!roomId) return;
    getRoom(roomId).then(setRoom);
    getRoomMemebers(roomId).then(setCurrentlyWatchUsers);
  }, [roomId]);

  const handleUsers = (users: User[]) => {
    setCurrentlyWatchUsers(users);
  };

  useEffect(() => {
    if (!roomsSocket) return;

    roomsSocket.on("room:users", handleUsers);

    return () => {
      roomsSocket.off("room:users", handleUsers);
    };
  }, [roomsSocket]);

  useEffect(() => {
    if (!roomsSocket) return;

    if (notify === "true") {
      roomsSocket.emit("room:join", {
        roomId,
      });

      const params = new URLSearchParams(searchParams.toString());
      params.delete("notify");

      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [notify, roomsSocket]);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      if (!isNaN(video.duration)) setDuration(video.duration);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!video) return;
        const isInputFocused = ["INPUT", "TEXTAREA"].includes(
          document.activeElement?.tagName || ""
        );

        if (isInputFocused) {
          return;
        }
        if (e.key === "f" || e.key === "F") {
          e.preventDefault();
          handleFullScreen();
        }
        switch (e.code) {
          case "Space":
            e.preventDefault();
            if (video.paused) {
              video.play();
              setIsPlaying(true);
            } else {
              video.pause();
              setIsPlaying(false);
            }

            break;
          case "ArrowRight":
            e.preventDefault();
            video.currentTime = Math.min(video.duration, video.currentTime + 5);
            break;
          case "ArrowLeft":
            e.preventDefault();
            video.currentTime = Math.max(0, video.currentTime - 5);
            break;
          default:
            break;
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
      };
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const seekTime = parseFloat(e.target.value);
    if (video && !isNaN(seekTime)) {
      video.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video) {
      video.volume = parseFloat(e.target.value);
      setVolume(video.volume);
      if (video.volume > 0 && video.muted) video.muted = false;
      // muteHandle();
    }
  };

  const muteHandle = () => {
    const video = videoRef.current;
    if (video) {
      if (video.muted) {
        video.muted = false;
        setVolume(1);
      } else {
        video.muted = true;
        setVolume(0);
      }
    }
  };

  const handleFullScreen = () => {
    const videoContainer = videoRef.current?.parentElement;
    if (!document.fullscreenElement) {
      videoContainer?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  return (
    <div
      className="w-full h-[100vh] relative bg-black"
      onMouseMove={handleMouseMove}
    >
      <video
        ref={videoRef}
        width="640"
        height="360"
        src="/videos/squid_game.mp4"
        preload="auto"
        className="w-full h-full"
        onTimeUpdate={handleTimeUpdate}
        onClick={handleVideoClick}
      />

      <div
        className={`absolute top-0 left-0 w-full h-full bg-black transition-opacity duration-300 ${
          controlsVisible ? "opacity-50" : "opacity-0"
        }`}
        onClick={handleVideoClick}
      />
      {controlsVisible && (
        <div className="absolute top-12 w-full px-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/icons/just-arrow.svg"
              width={35}
              height={35}
              alt="Arrow"
              className="rotate-180"
            />
            <h2>POCETNA</h2>
          </Link>
          <div className="flex gap-6">
            <div className="flex items-center">
              {currentlyWatchUsers && (
                <AnimatedTooltip users={currentlyWatchUsers} />
              )}
            </div>
            <div className="relative top-0">
              <ModernIcon
                icon="settings"
                iconSize={30}
                smallPadding={true}
                onclick={handleFriendsOpen}
              />

              <CurrentlyWatchingComponent
                isFriendsOpen={isFriendsOpen}
                currentlyWatchUsersData={currentlyWatchUsers}
                room={room}
                onSetRoom={setRoom}
                roomsSocket={roomsSocket!!}
              />
            </div>
          </div>
        </div>
      )}
      {controlsVisible && (
        <div className="absolute bottom-12 w-full px-24">
          <div className="w-[60px] h-[60px] rounded-[30px] bg-white flex items-center justify-center mb-8 relative">
            <Icon
              icon="forum"
              iconSize={30}
              variation="text-black font-bold cursor-pointer"
              onClick={() => handleIsMessageBoxOpen("open")}
            />
            <motion.div
              className="absolute bottom-[70px] left-0 bg-white rounded-[30px] w-[340px] h-[550px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMessageBoxOpen === "open" ? 1 : 0,
                y: isMessageBoxOpen === "open" ? 0 : 20,
              }}
              transition={{ duration: 0.3 }}
              style={{
                pointerEvents: isMessageBoxOpen === "open" ? "auto" : "none",
              }}
            >
              <Chat
                chatUsersBase={currentlyWatchUsers}
                onClose={() => handleIsMessageBoxOpen("closed")}
              />
            </motion.div>
          </div>
          <div className="w-full flex items-center gap-4">
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="custom-slider"
            />
            <p className="font-display text-2xl font-bold">
              {duration && currentTime
                ? formatTime(duration - currentTime)
                : "0:00"}
            </p>
          </div>
          <div className="w-full flex mt-3 justify-between items-center">
            <div className="w-1/3 flex items-center gap-5">
              <h2>The Fellowship of the Ring</h2>
              <ModernIcon icon="heart_plus" iconSize={30} smallPadding={true} />
            </div>
            <div className="w-1/3 flex justify-center">
              <ModernIcon
                icon={isPlaying ? "pause" : "play_arrow"}
                iconSize={50}
                smallPadding={true}
                onclick={togglePlay}
              />
            </div>
            <div className="w-1/3 flex justify-end gap-4 items-center">
              <div className="relative group flex items-center">
                <Icon
                  icon={`${volume === 0 ? `volume_off` : `volume_up`}`}
                  iconSize={30}
                  onClick={muteHandle}
                />
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-300">
                  <div className="py-4 px-2 bg-dark-gray rounded-lg -rotate-90 mb-10 flex items-center">
                    <input
                      type="range"
                      value={volume}
                      onChange={handleVolumeChange}
                      min={0}
                      max={1}
                      step={0.1}
                      className="w-[120px] h-1 bg-gray-300 rounded-full appearance-none m-0 p-0 hover:h-2"
                    />
                  </div>
                </div>
              </div>

              <Icon
                icon={isFullScreen ? "fullscreen_exit" : "fullscreen"}
                iconSize={30}
                onClick={handleFullScreen}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
