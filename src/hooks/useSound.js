import { useState, useRef, useEffect } from "react";

export function useSound() {
  const [mode, setModeState] = useState("off");
  const ctxRef  = useRef(null);
  const nodeRef = useRef(null);

  const stop = () => {
    try { nodeRef.current?.stop(); } catch {}
    try { ctxRef.current?.close(); } catch {}
    nodeRef.current = null;
    ctxRef.current  = null;
  };

  const play = (type) => {
    stop();
    const ctx        = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current   = ctx;
    const rate       = ctx.sampleRate;
    const bufferSize = rate * 4;
    const buffer     = ctx.createBuffer(1, bufferSize, rate);
    const data       = buffer.getChannelData(0);
    const gain       = ctx.createGain();
    const source     = ctx.createBufferSource();
    source.buffer    = buffer;
    source.loop      = true;

    if (type === "white") {
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      gain.gain.value = 0.04;
      source.connect(gain);
    } else if (type === "rain") {
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 600;
      gain.gain.value = 0.22;
      source.connect(filter);
      filter.connect(gain);
    } else if (type === "brown") {
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const w  = Math.random() * 2 - 1;
        data[i]  = (last + 0.02 * w) / 1.02;
        last     = data[i];
        data[i] *= 3.5;
      }
      gain.gain.value = 0.32;
      source.connect(gain);
    }

    gain.connect(ctx.destination);
    source.start();
    nodeRef.current = source;
  };

  const setMode = (m) => {
    setModeState(m);
    if (m === "off") stop();
    else play(m);
  };

  // stop audio when component unmounts (e.g. leaving Timer screen)
  useEffect(() => () => stop(), []);

  return [mode, setMode];
}
