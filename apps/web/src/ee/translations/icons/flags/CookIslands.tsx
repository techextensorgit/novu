import React from 'react';

export function CookIslands(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={40} height={40} fill="none" {...props}>
      <g clipPath="url(#prefix__clip0_568_193185)">
        <path
          d="M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20C0 20.005 20 .002 20 0c11.046 0 20 8.954 20 20z"
          fill="#0052B4"
        />
        <path
          d="M19.947 20h.054v-.053l-.054.053zM20 10.435V0h-.003C8.952.002 0 8.955 0 20h10.435v-5.876L16.31 20h3.636l.053-.053V16.31l-5.876-5.876H20z"
          fill="#F0F0F0"
        />
        <path d="M10.12 2.609a20.095 20.095 0 00-7.51 7.51V20h5.217V7.826H20V2.61h-9.882z" fill="#D80027" />
        <path d="M20 17.54l-7.105-7.105h-2.46L20.002 20v-2.46z" fill="#D80027" />
        <path
          d="M26.956 20l.37 1.139h1.197l-.968.704.37 1.138-.97-.704-.968.704.37-1.139-.968-.703h1.197l.37-1.139zM22.038 22.038l1.066.543.847-.847-.187 1.183 1.067.544-1.183.187-.187 1.183-.544-1.067-1.183.187.847-.847-.543-1.066zM20 26.956l1.139-.37V25.39l.704.969 1.138-.37-.704.968.704.97-1.139-.37-.703.968v-1.197L20 26.957zM22.038 31.875l.543-1.066-.847-.847 1.183.187.544-1.067.187 1.183 1.183.187-1.067.544.187 1.183-.847-.847-1.066.543zM26.956 33.913l-.37-1.139h-1.197l.968-.703-.37-1.14.969.704.969-.703-.37 1.139.968.703h-1.197l-.37 1.139zM31.875 31.875l-1.067-.543-.846.847.187-1.183-1.067-.544 1.183-.187.187-1.183.543 1.067 1.183-.187-.847.847.544 1.066zM33.913 26.956l-1.139.37v1.198l-.704-.969-1.138.37.704-.969-.704-.968 1.138.37.704-.969v1.198l1.139.37zM31.875 22.038l-.543 1.067.846.846-1.182-.187-.544 1.067-.187-1.183-1.183-.187 1.067-.544-.187-1.182.846.846 1.067-.543z"
          fill="#F0F0F0"
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_568_193185">
          <path fill="#fff" d="M0 0h40v40H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
