import { useEffect, useState, useRef } from "react";
import { createLogger } from "~/lib/logger";

const logger = createLogger({ component: "hooks" });

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
        logger.error("Error loading audio", { error, soundPath });
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

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      logger.error("Error reading from localStorage", { error, key });
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      logger.error("Error setting localStorage", { error, key, value });
    }
  };

  return [storedValue, setValue];
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
