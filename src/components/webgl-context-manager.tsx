import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export function WebGLContextManager() {
  const gl = useThree((state) => state.gl);
  
  useEffect(() => {
    return () => {
      // Force immediate WebGL context disposal to prevent hitting browser limits
      // during Next.js View Transitions or Fast Refresh
      const extension = gl.getExtension("WEBGL_lose_context");
      if (extension) {
        extension.loseContext();
      }
    };
  }, [gl]);

  return null;
}
