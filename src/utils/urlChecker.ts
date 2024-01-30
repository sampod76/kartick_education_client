import { ENUM_VIDEO_PLATFORM } from "@/constants/globalEnums";
import vimeoUrlCheck from "./vimeoUrlChecker";
interface result {
  platform: string;
  data: number | string | null;
}

export const urlChecker = (url: string): result => {
  const result: result = {
    platform: "",
    data: null,
  };
  if (!url) {
    return result;
  }
  const vimeo = vimeoUrlCheck(url);

  if (vimeo) {
    result.platform = ENUM_VIDEO_PLATFORM.VIMEO;
    result.data = vimeo; // You may need to adjust this based on your vimeoUrlCheck function return type
  }
  if (!vimeo) {
    const youtube = function isYouTubeUrl(url: string): string | null {
      // Regular expression for a YouTube video URL
      var videoPattern =
        /^https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\//;

      // Regular expression for a YouTube channel URL
      // var channelPattern = /^https?:\/\/(?:www\.)?youtube\.com\/(?:c\/|channel\/|user\/)/;

      // Test if the URL matches either video or channel pattern
      // return videoPattern.test(url) || channelPattern.test(url);
      return videoPattern.test(url) ? url : null;
    };
    if (youtube(url)) {
      result.platform = ENUM_VIDEO_PLATFORM.YOUTUBE;
      result.data = url;
    }
  }

  return result;
};
