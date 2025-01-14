import { VideoPlayer } from "@/components/video-player";

export default function PlayerPage() {
  return (
    <div className="w-full h-[100vh]">
      {/* <video width={320} height={320} controls preload="true" className="w-full h-full">
        <source src="/videos/squid_game.mp4" type="video/mp4" />
        {/* DODAVANJE PREOVDA 
        <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      </video> */}
      <VideoPlayer/>
    </div>
  );
}
