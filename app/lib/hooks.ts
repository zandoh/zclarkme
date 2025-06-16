import { useEffect, useState, useRef } from "react";

export function useKeyPress(
  keyCode: string,
  onKeyDown?: () => void,
  elementRef?: React.RefObject<HTMLButtonElement>
) {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.code === keyCode ||
        (e.code === "Enter" && elementRef?.current === document.activeElement)
      ) {
        setIsPressed(true);
        onKeyDown?.();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        e.code === keyCode ||
        (e.code === "Enter" && elementRef?.current === document.activeElement)
      ) {
        setIsPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keyCode, onKeyDown, elementRef]);

  return isPressed;
}

export function useAudio(soundPath: string) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  useEffect(() => {
    const initAudio = async () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      try {
        const response = await fetch(soundPath);
        const arrayBuffer = await response.arrayBuffer();

        audioBufferRef.current = await audioContextRef.current.decodeAudioData(
          arrayBuffer
        );
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    };

    initAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [soundPath]);

  const play = () => {
    if (!audioContextRef.current || !audioBufferRef.current) return;

    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(audioContextRef.current.destination);
    source.start(0);
  };

  return { play };
}
