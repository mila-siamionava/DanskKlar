export default function AarhusSketch({ className = "", decorative = true }) {
  return (
    <svg
      viewBox="0 105 1536 375"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? "true" : undefined}
      aria-label={decorative ? undefined : "Aarhus skyline"}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="3.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ================= WATER ================= */}
        <path d="M15 392 H1518" />
        <path d="M25 422 h120" />
        <path d="M165 440 h80" />
        <path d="M265 418 h115" />
        <path d="M405 438 h90" />
        <path d="M520 420 h115" />
        <path d="M660 444 h100" />
        <path d="M785 420 h130" />
        <path d="M940 438 h110" />
        <path d="M1080 420 h130" />
        <path d="M1240 441 h95" />
        <path d="M1360 420 h140" />
        <path d="M200 470 h120" />
        <path d="M355 454 h75" />
        <path d="M470 470 h90" />
        <path d="M790 470 h80" />
        <path d="M930 455 h95" />
        <path d="M1070 470 h115" />
        <path d="M1240 455 h95" />
        <path d="M1395 470 h100" />
        {/* reflections of the Rådhus tower and the ARoS rainbow */}
        <path d="M712 402 h36" />
        <path d="M718 411 h24" />
        <path d="M724 420 h12" />
        <path d="M1150 403 h78" />
        <path d="M1165 412 h48" />

        {/* ================= AARHUS Ø ================= */}
        <g>
          {/* left building */}
          <path d="M15 380 V285 L65 230 L115 275 V380" />
          <path d="M65 230 V380" />

          {/* Lighthouse */}
          <path d="M115 380 V230 L162 145 L190 380" />
          <path d="M162 145 L184 160" />

          {/* balconies */}
          <path d="M140 205 h28" />
          <path d="M138 222 h30" />
          <path d="M135 240 h34" />
          <path d="M132 258 h36" />
          <path d="M130 276 h38" />
          <path d="M128 294 h40" />
          <path d="M126 312 h40" />
          <path d="M124 330 h40" />

          {/* second angular building */}
          <path d="M190 380 V275 L235 235 L290 290 V380" />
          <path d="M235 235 V380" />

          {/* third */}
          <path d="M290 380 V300 L330 260 L375 305 V380" />
          <path d="M330 260 V380" />

          {/* windows */}
          <path d="M35 300 h9 v14 h-9z" />
          <path d="M55 285 h9 v14 h-9z" />
          <path d="M78 300 h9 v14 h-9z" />
          <path d="M210 295 h9 v14 h-9z" />
          <path d="M235 282 h9 v14 h-9z" />
          <path d="M260 300 h9 v14 h-9z" />
          <path d="M310 320 h9 v14 h-9z" />
          <path d="M335 305 h9 v14 h-9z" />
          <path d="M355 320 h9 v14 h-9z" />

          {/* trees */}
          <circle cx="35" cy="360" r="14" />
          <path d="M35 374 V390" />

          <circle cx="70" cy="355" r="17" />
          <path d="M70 372 V390" />

          <circle cx="105" cy="360" r="14" />
          <path d="M105 374 V390" />

          <circle cx="285" cy="360" r="15" />
          <path d="M285 375 V390" />

          <circle cx="350" cy="360" r="14" />
          <path d="M350 374 V390" />
        </g>
        {/* ================= LEFT SAILBOAT ================= */}
        <g transform="translate(7 67)">
          <path d="M125 392 Q155 405 190 392" />
          <path d="M155 392 V298" />
          <path d="M155 310 L125 375 H155z" />
          <path d="M159 322 L187 375 H159z" />

          {/* Dannebrog */}
          <rect x="155" y="298" width="14" height="9" style={{ fill: "var(--color-flag)", stroke: "none" }} />
          <path d="M160 298 V307 M155 302.5 H169" strokeWidth="1.6" style={{ stroke: "var(--color-flag-cross)" }} />
        </g>
        {/* ================= BRIDGE ================= */}
        <g>
          <path d="M390 380 H570" />
          <path d="M390 366 H570" />

          <path d="M410 366 Q435 330 460 366" />
          <path d="M460 366 Q485 330 510 366" />
          <path d="M510 366 Q535 330 560 366" />

          <path d="M405 350 V335" />
          <path d="M455 350 V332" />
          <path d="M505 350 V332" />
          <path d="M555 350 V335" />
        </g>
        {/* ================= DOMKIRKEN ================= */}
        {/* behind the bridge, so its base is hidden */}
        <g strokeWidth="3.2">
          {/* tower and spire */}
          <path d="M452 324 V235 H488 V324" />
          <path d="M452 235 L470 150 L488 235" />
          <path d="M470 150 V138" />
          <path d="M465 143 h10" />

          {/* clock and belfry */}
          <circle cx="470" cy="256" r="6" />
          <path d="M463 282 V298" />
          <path d="M477 282 V298" />

          {/* nave */}
          <path d="M488 285 H558 V324" />
          <path d="M488 285 L496 276 H550 L558 285" />

          {/* arched windows */}
          <path d="M500 318 V303 Q505 295 510 303 V318" />
          <path d="M518 318 V303 Q523 295 528 303 V318" />
          <path d="M536 318 V303 Q541 295 546 303 V318" />
        </g>

        {/* ================= RÅDHUS ================= */}
        <g>
          {/* base */}
          <path d="M600 380 V305 H820 V380" />

          {/* tower */}
          <path d="M700 305 V125 H760 V380" />

          {/* top framework */}
          <path d="M705 130 h50" />
          <path d="M710 130 v25" />
          <path d="M725 125 v30" />
          <path d="M740 125 v30" />
          <path d="M755 130 v25" />

          {/* clock */}
          <circle cx="730" cy="215" r="22" />
          <path d="M730 215 L730 200" />
          <path d="M730 215 L742 225" />

          {/* tower verticals */}
          <path d="M715 160 V190" />
          <path d="M730 158 V190" />
          <path d="M745 160 V190" />

          <path d="M715 240 V300" />
          <path d="M730 240 V300" />
          <path d="M745 240 V300" />

          {/* facade */}
          <path d="M625 325 V372" />
          <path d="M648 320 V372" />
          <path d="M675 320 V372" />
          <path d="M785 320 V372" />
          <path d="M808 325 V372" />

          {/* trees */}
          <circle cx="585" cy="355" r="18" />
          <path d="M585 373 V392" />

          <circle cx="695" cy="358" r="17" />
          <path d="M695 375 V392" />

          <circle cx="780" cy="358" r="17" />
          <path d="M780 375 V392" />
        </g>
        {/* ================= DOKK1 ================= */}
        <g>
          {/* upper floating form */}
          <path d="M820 300 L875 275 H1050 L1090 300 L1060 325 H850z" />
          <path d="M850 325 H1060" />

          {/* upper windows */}
          <path d="M870 295 H1045" />
          <path d="M885 295 V315" />
          <path d="M910 295 V315" />
          <path d="M935 295 V315" />
          <path d="M960 295 V315" />
          <path d="M985 295 V315" />
          <path d="M1010 295 V315" />
          <path d="M1035 295 V315" />

          {/* lower section */}
          <path d="M850 340 H1065" />

          {/* ramps */}
          <path d="M860 340 L930 380" />
          <path d="M1035 340 L970 380" />

          {/* facade */}
          <path d="M890 340 V375" />
          <path d="M920 340 V375" />
          <path d="M950 340 V375" />
          <path d="M980 340 V375" />
          <path d="M1010 340 V375" />
          <path d="M1040 340 V375" />

          <path d="M850 380 H1070" />
        </g>
        {/* ================= ARoS ================= */}
<g>
  {/* building */}
  <path d="M1090 380 V310 H1285 V380" />

  {/* wider rainbow ring */}
  <ellipse cx="1188" cy="282" rx="112" ry="24" />
  <ellipse cx="1188" cy="292" rx="98" ry="16" />

  {/* ring supports */}
  <path d="M1085 280 V300" />
  <path d="M1120 272 V300" />
  <path d="M1155 268 V300" />
  <path d="M1188 266 V300" />
  <path d="M1220 268 V300" />
  <path d="M1255 272 V300" />
  <path d="M1290 280 V300" />

  {/* building windows */}
  <path d="M1140 330 h30 v42 h-30z" />
  <path d="M1235 330 h24 v42 h-24z" />

  {/* trees */}
  <circle cx="1080" cy="358" r="16" />
  <path d="M1080 374 V392" />

  <circle cx="1115" cy="356" r="18" />
  <path d="M1115 374 V392" />

  <circle cx="1265" cy="356" r="18" />
  <path d="M1265 374 V392" />
</g>
        {/* ================= HARBOUR ================= */}
        <g transform="translate(0 70)">
          {/* boat 1 */}
          <path d="M1280 392 Q1320 405 1360 392" />
          <path d="M1320 392 V250" />
          <path d="M1320 265 L1285 375 H1320z" />
          <path d="M1325 285 L1355 375 H1325z" />
          <rect x="1320" y="250" width="16" height="10" style={{ fill: "var(--color-flag)", stroke: "none" }} />
          <path d="M1326 250 V260 M1320 255 H1336" strokeWidth="1.6" style={{ stroke: "var(--color-flag-cross)" }} />

          {/* boat 2 */}
          <path d="M1340 392 Q1380 405 1420 392" />
          <path d="M1380 392 V270" />
          <path d="M1380 285 L1350 375 H1380z" />
          <path d="M1385 300 L1410 375 H1385z" />
        </g>
        {/* ================= RIGHT HOUSES ================= */}
        <g>
          <path d="M1360 380 V325 L1395 285 L1430 320 V380" />
          <path d="M1430 380 V305 L1460 275 L1495 310 V380" />

          <path d="M1395 285 L1412 275 L1425 290" />
          <path d="M1460 275 L1470 260 L1480 275" />

          {/* windows */}
          <path d="M1380 330 h10 v15 h-10z" />
          <path d="M1405 325 h10 v15 h-10z" />
          <path d="M1450 325 h10 v15 h-10z" />
          <path d="M1475 320 h10 v15 h-10z" />

          {/* café */}
          <path d="M1370 370 H1505" />
          <path d="M1385 355 l15 -10 l15 10" />
          <path d="M1420 355 l15 -10 l15 10" />
          <path d="M1455 355 l15 -10 l15 10" />
        </g>
        {/* ================= CLOUDS ================= */}
        <path d="M310 235 Q330 205 350 235 Q375 190 420 235" />
        <path d="M835 235 Q855 205 875 235 Q900 195 940 235" />
        <path d="M1160 235 Q1180 205 1200 235 Q1225 195 1265 235" />
        {/* ================= BIRDS ================= */}
        <path d="M530 205 Q540 195 550 205 Q560 195 570 205" />
        <path d="M570 180 Q580 170 590 180 Q600 170 610 180" />
        <path d="M1070 195 Q1080 185 1090 195 Q1100 185 1110 195" />
        <path d="M1110 220 Q1120 210 1130 220 Q1140 210 1150 220" />
      </g>
    </svg>
  );
}
