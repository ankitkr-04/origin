import type { Identity } from "@/types/content";

export function CodingStats({ identity }: { identity: Identity }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <a
        href={`https://leetcode.com/u/${identity.leetcodeHandle}`}
        target="_blank"
        rel="noopener noreferrer"
        data-warm
        className="group relative flex cursor-pointer items-center justify-center gap-2 rounded border border-line/40 bg-abyss/40 px-3 py-3 transition-colors hover:border-line/70 hover:bg-abyss/60"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-mist transition-colors group-hover:text-flame"
          role="img"
          aria-label="LeetCode Logo"
        >
          <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125 2.513 5.277 5.277 0 0 0 1.062 2.362 5.33 5.33 0 0 0 2.107 1.637 5.281 5.281 0 0 0 2.512.453 5.378 5.378 0 0 0 2.455-.785 5.264 5.264 0 0 0 1.944-1.896l3.352-4.996c.264-.378.431-.817.51-1.272a2.696 2.696 0 0 0-.098-1.245 2.645 2.645 0 0 0-.584-1.127 2.668 2.668 0 0 0-1.042-.716 2.617 2.617 0 0 0-1.294-.132 2.662 2.662 0 0 0-1.16.51l-4.57 3.32a.747.747 0 0 1-.397.164.717.717 0 0 1-.416-.076.71.71 0 0 1-.336-.341.748.748 0 0 1-.019-.44.75.75 0 0 1 .232-.383l5.06-4.636a.715.715 0 0 1 .494-.207.726.726 0 0 1 .472.232l3.414 3.738a.72.72 0 0 0 .506.219.722.722 0 0 0 .524-.204.757.757 0 0 0 .21-.504.72.72 0 0 0-.196-.518L14.437.458A1.36 1.36 0 0 0 13.483 0zm-5.816 17.595a2.632 2.632 0 0 1-1.574-.533 2.648 2.648 0 0 1-.954-1.285 2.664 2.664 0 0 1 .05-1.59 2.638 2.638 0 0 1 .792-1.2l3.197-2.927a.745.745 0 0 1 .49-.196.713.713 0 0 1 .481.246.732.732 0 0 1 .19.508.756.756 0 0 1-.225.495l-3.235 2.96a1.218 1.218 0 0 0-.354.545 1.233 1.233 0 0 0 .005.698 1.225 1.225 0 0 0 .438.595 1.212 1.212 0 0 0 .727.25h8.337a.72.72 0 0 1 .521.212.748.748 0 0 1 .211.52.744.744 0 0 1-.215.521.724.724 0 0 1-.517.217H7.667z" />
        </svg>
        <span className="font-mono text-[10px] tracking-[0.1em] text-mist transition-colors group-hover:text-polar">
          LeetCode
        </span>
      </a>

      <a
        href={`https://codeforces.com/profile/${identity.codeforcesHandle}`}
        target="_blank"
        rel="noopener noreferrer"
        data-warm
        className="group relative flex cursor-pointer items-center justify-center gap-2 rounded border border-line/40 bg-abyss/40 px-3 py-3 transition-colors hover:border-line/70 hover:bg-abyss/60"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-mist transition-colors group-hover:text-polar"
          role="img"
          aria-label="Codeforces Logo"
        >
          <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
        </svg>
        <span className="font-mono text-[10px] tracking-[0.1em] text-mist transition-colors group-hover:text-polar">
          Codeforces
        </span>
      </a>
    </div>
  );
}
