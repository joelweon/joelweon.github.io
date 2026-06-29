import { defineConfig } from 'vite';
import { resolve } from 'path';

// Jekyll 사이트의 /threejs/ 경로로 서빙되는 정적 산출물을 생성한다.
// 소스는 threejs-keyframes/ 에 두고, 빌드 결과만 리포 루트 threejs/ 로 내보낸다.
export default defineConfig({
  base: '/threejs/',
  build: {
    outDir: '../threejs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        galaxy: resolve(__dirname, 'galaxy.html'),
        city: resolve(__dirname, 'city.html'),
        future: resolve(__dirname, 'future.html'),
        heli: resolve(__dirname, 'heli.html'),
        // 블로그 프로젝트 영역에 인라인 임베드되는 갤러리 (고정 파일명)
        embed: resolve(__dirname, 'src/embed.js'),
      },
      output: {
        // embed 만 해시 없는 고정 이름으로 → Jekyll 에서 직접 참조
        entryFileNames: (chunk) =>
          chunk.name === 'embed' ? 'embed.js' : 'assets/[name]-[hash].js',
      },
    },
  },
});
