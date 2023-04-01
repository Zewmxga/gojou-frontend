import Plyr from 'plyr';
import Hls from 'hls.js';


const getPlyrOptions = (hlsRef) => {
  const availableQualities = hlsRef.levels.map(l => l.height)

  const plyrOptions = {
    controls: [
      'rewind', 'play', 'play-large', 'fast-forward', 'progress',
      'current-time', 'duration', 'mute', 'volume',
      'captions', 'settings', 'pip', 'airplay', 'fullscreen',
    ],
    settings: ['captions', 'quality', 'speed'],
    keyboard: { 
      focused: true, global: true,
    },
    speed: { 
      selected: 1, 
      options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] 
    },
    storage: { enabled: true, key: 'gojou-video-preferences' },
    tooltips: { controls: true, seek: true },
    captions: {
      active: true,
      language: 'auto',
      update: true
    },
    quality: {
      default: availableQualities[0],
      options: availableQualities,
      forced: true,
      onChange: (newQuality) => {
        for (const [levelIndex, level] of hlsRef.levels.entries()) {
          if (level.height === newQuality)
            hlsRef.currentLevel = levelIndex;
        }
      }
    },
    debug: false
  
  };

  return plyrOptions;

}

const initVideoPlayer = (initOptions) => {
  const { autoSrc, closedCaptions, videoElement, videoWrapper } = initOptions;

  if(!videoElement) {
    console.log("Video in iframe");
    return false;
  };

  if(!Hls.isSupported()) {
    console.log("Your browser doesn't support HLS lmao");
    return false;
  }

  const hls = new Hls();

  hls.attachMedia(videoElement);
  hls.loadSource(autoSrc);

  hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
    const plyrOptions = getPlyrOptions(hls);

    const plyr = new Plyr(videoElement, plyrOptions);

    videoWrapper.addEventListener('keydown', e => {
      if(e.key === " ") {
        e.preventDefault();
        plyr.togglePlay();
      }
    })
     
  })

  for (const caption of closedCaptions) {
    const srcLang = caption.lang.substring(0, 3).toLowerCase();
    const defaultLang = 'english';

    if(caption.lang.toLowerCase().includes('thumbnail')) continue;

    const track = document.createElement('track');
    track.setAttribute('kind', 'captions');
    track.setAttribute('label', caption.lang);
    track.setAttribute('src', caption.url);
    track.setAttribute('srclang', srcLang);

    if (caption.lang.toLowerCase().includes(defaultLang))
      track.setAttribute('default', '');

    videoElement.append(track);
  }

  return true;
}

export { initVideoPlayer }
