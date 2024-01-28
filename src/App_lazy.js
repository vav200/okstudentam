import "./app.css";
import React, { useEffect, useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Main from "./main/Main";

const Personal_area = lazy(() => import("./users/Personal_area"));

const Finishedworks = lazy(() => import("./finishedworks/Finishedworks"));
const Page1 = lazy(() => import("./finishedworks/lists/Page1"));
const Page2 = lazy(() => import("./finishedworks/lists/Page2"));
const Page3 = lazy(() => import("./finishedworks/lists/Page3"));
const Page4 = lazy(() => import("./finishedworks/lists/Page4"));
const Page5 = lazy(() => import("./finishedworks/lists/Page5"));
const Page6 = lazy(() => import("./finishedworks/lists/Page6"));
const Page7 = lazy(() => import("./finishedworks/lists/Page7"));
const Page8 = lazy(() => import("./finishedworks/lists/Page8"));
const Page9 = lazy(() => import("./finishedworks/lists/Page9"));
const Page10 = lazy(() => import("./finishedworks/lists/Page10"));
const Page11 = lazy(() => import("./finishedworks/lists/Page11"));

const Helper = lazy(() => import("./helper/Helper"));
const Guarantees = lazy(() => import("./guarantees/Guarantees"));
const Kontacts = lazy(() => import("./kontacts/Kontacts"));
const Addfreeworks = lazy(() => import("./adminpanel/Addfreeworks"));

// import Outworks from "./finishedworks/Outworks";

const Work101 = lazy(() => import("./finishedworks/freeworks/Work101"));
const Work102 = lazy(() => import("./finishedworks/freeworks/Work102"));
const Work103 = lazy(() => import("./finishedworks/freeworks/Work103"));
const Work104 = lazy(() => import("./finishedworks/freeworks/Work104"));
const Work105 = lazy(() => import("./finishedworks/freeworks/Work105"));
const Work106 = lazy(() => import("./finishedworks/freeworks/Work106"));
const Work107 = lazy(() => import("./finishedworks/freeworks/Work107"));
const Work108 = lazy(() => import("./finishedworks/freeworks/Work108"));
const Work109 = lazy(() => import("./finishedworks/freeworks/Work109"));
const Work110 = lazy(() => import("./finishedworks/freeworks/Work110"));
const Work111 = lazy(() => import("./finishedworks/freeworks/Work111"));
const Work112 = lazy(() => import("./finishedworks/freeworks/Work112"));
const Work113 = lazy(() => import("./finishedworks/freeworks/Work113"));
const Work114 = lazy(() => import("./finishedworks/freeworks/Work114"));
const Work115 = lazy(() => import("./finishedworks/freeworks/Work115"));
const Work116 = lazy(() => import("./finishedworks/freeworks/Work116"));
const Work117 = lazy(() => import("./finishedworks/freeworks/Work117"));
const Work118 = lazy(() => import("./finishedworks/freeworks/Work118"));
const Work119 = lazy(() => import("./finishedworks/freeworks/Work119"));
const Work120 = lazy(() => import("./finishedworks/freeworks/Work120"));
const Work121 = lazy(() => import("./finishedworks/freeworks/Work121"));
const Work122 = lazy(() => import("./finishedworks/freeworks/Work122"));
const Work123 = lazy(() => import("./finishedworks/freeworks/Work123"));
const Work124 = lazy(() => import("./finishedworks/freeworks/Work124"));
const Work125 = lazy(() => import("./finishedworks/freeworks/Work125"));
const Work126 = lazy(() => import("./finishedworks/freeworks/Work126"));
const Work127 = lazy(() => import("./finishedworks/freeworks/Work127"));
const Work128 = lazy(() => import("./finishedworks/freeworks/Work128"));
const Work129 = lazy(() => import("./finishedworks/freeworks/Work129"));
const Work130 = lazy(() => import("./finishedworks/freeworks/Work130"));
const Work131 = lazy(() => import("./finishedworks/freeworks/Work131"));
const Work132 = lazy(() => import("./finishedworks/freeworks/Work132"));
const Work133 = lazy(() => import("./finishedworks/freeworks/Work133"));
const Work134 = lazy(() => import("./finishedworks/freeworks/Work134"));
const Work135 = lazy(() => import("./finishedworks/freeworks/Work135"));
const Work136 = lazy(() => import("./finishedworks/freeworks/Work136"));
const Work137 = lazy(() => import("./finishedworks/freeworks/Work137"));
const Work138 = lazy(() => import("./finishedworks/freeworks/Work138"));
const Work139 = lazy(() => import("./finishedworks/freeworks/Work139"));
const Work140 = lazy(() => import("./finishedworks/freeworks/Work140"));
const Work141 = lazy(() => import("./finishedworks/freeworks/Work141"));
const Work142 = lazy(() => import("./finishedworks/freeworks/Work142"));
const Work143 = lazy(() => import("./finishedworks/freeworks/Work143"));
const Work144 = lazy(() => import("./finishedworks/freeworks/Work144"));
const Work145 = lazy(() => import("./finishedworks/freeworks/Work145"));
const Work146 = lazy(() => import("./finishedworks/freeworks/Work146"));
const Work147 = lazy(() => import("./finishedworks/freeworks/Work147"));
const Work148 = lazy(() => import("./finishedworks/freeworks/Work148"));
const Work149 = lazy(() => import("./finishedworks/freeworks/Work149"));
const Work150 = lazy(() => import("./finishedworks/freeworks/Work150"));
const Work151 = lazy(() => import("./finishedworks/freeworks/Work151"));
const Work152 = lazy(() => import("./finishedworks/freeworks/Work152"));
const Work153 = lazy(() => import("./finishedworks/freeworks/Work153"));
const Work154 = lazy(() => import("./finishedworks/freeworks/Work154"));
const Work155 = lazy(() => import("./finishedworks/freeworks/Work155"));
const Work156 = lazy(() => import("./finishedworks/freeworks/Work156"));
const Work157 = lazy(() => import("./finishedworks/freeworks/Work157"));
const Work158 = lazy(() => import("./finishedworks/freeworks/Work158"));
const Work159 = lazy(() => import("./finishedworks/freeworks/Work159"));
const Work160 = lazy(() => import("./finishedworks/freeworks/Work160"));
const Work161 = lazy(() => import("./finishedworks/freeworks/Work161"));
const Work162 = lazy(() => import("./finishedworks/freeworks/Work162"));
const Work163 = lazy(() => import("./finishedworks/freeworks/Work163"));
const Work164 = lazy(() => import("./finishedworks/freeworks/Work164"));
const Work165 = lazy(() => import("./finishedworks/freeworks/Work165"));
const Work166 = lazy(() => import("./finishedworks/freeworks/Work166"));
const Work167 = lazy(() => import("./finishedworks/freeworks/Work167"));
const Work168 = lazy(() => import("./finishedworks/freeworks/Work168"));
const Work169 = lazy(() => import("./finishedworks/freeworks/Work169"));
const Work170 = lazy(() => import("./finishedworks/freeworks/Work170"));
const Work171 = lazy(() => import("./finishedworks/freeworks/Work171"));
const Work172 = lazy(() => import("./finishedworks/freeworks/Work172"));
const Work173 = lazy(() => import("./finishedworks/freeworks/Work173"));
const Work174 = lazy(() => import("./finishedworks/freeworks/Work174"));
const Work175 = lazy(() => import("./finishedworks/freeworks/Work175"));
const Work176 = lazy(() => import("./finishedworks/freeworks/Work176"));
const Work177 = lazy(() => import("./finishedworks/freeworks/Work177"));
const Work178 = lazy(() => import("./finishedworks/freeworks/Work178"));
const Work179 = lazy(() => import("./finishedworks/freeworks/Work179"));
const Work180 = lazy(() => import("./finishedworks/freeworks/Work180"));
const Work181 = lazy(() => import("./finishedworks/freeworks/Work181"));
const Work182 = lazy(() => import("./finishedworks/freeworks/Work182"));
const Work183 = lazy(() => import("./finishedworks/freeworks/Work183"));
const Work184 = lazy(() => import("./finishedworks/freeworks/Work184"));
const Work185 = lazy(() => import("./finishedworks/freeworks/Work185"));
const Work186 = lazy(() => import("./finishedworks/freeworks/Work186"));
const Work187 = lazy(() => import("./finishedworks/freeworks/Work187"));
const Work188 = lazy(() => import("./finishedworks/freeworks/Work188"));
const Work189 = lazy(() => import("./finishedworks/freeworks/Work189"));
const Work190 = lazy(() => import("./finishedworks/freeworks/Work190"));
const Work191 = lazy(() => import("./finishedworks/freeworks/Work191"));
const Work192 = lazy(() => import("./finishedworks/freeworks/Work192"));
const Work193 = lazy(() => import("./finishedworks/freeworks/Work193"));
const Work194 = lazy(() => import("./finishedworks/freeworks/Work194"));
const Work195 = lazy(() => import("./finishedworks/freeworks/Work195"));
const Work196 = lazy(() => import("./finishedworks/freeworks/Work196"));
const Work197 = lazy(() => import("./finishedworks/freeworks/Work197"));
const Work198 = lazy(() => import("./finishedworks/freeworks/Work198"));
const Work199 = lazy(() => import("./finishedworks/freeworks/Work199"));
const Work200 = lazy(() => import("./finishedworks/freeworks/Work200"));
const Work201 = lazy(() => import("./finishedworks/freeworks/Work201"));
const Work202 = lazy(() => import("./finishedworks/freeworks/Work202"));
const Work203 = lazy(() => import("./finishedworks/freeworks/Work203"));
const Work204 = lazy(() => import("./finishedworks/freeworks/Work204"));
const Work205 = lazy(() => import("./finishedworks/freeworks/Work205"));
const Work206 = lazy(() => import("./finishedworks/freeworks/Work206"));
const Work207 = lazy(() => import("./finishedworks/freeworks/Work207"));
const Work208 = lazy(() => import("./finishedworks/freeworks/Work208"));
const Work209 = lazy(() => import("./finishedworks/freeworks/Work209"));
const Work210 = lazy(() => import("./finishedworks/freeworks/Work210"));
const Work211 = lazy(() => import("./finishedworks/freeworks/Work211"));
const Work212 = lazy(() => import("./finishedworks/freeworks/Work212"));
const Work213 = lazy(() => import("./finishedworks/freeworks/Work213"));
const Work214 = lazy(() => import("./finishedworks/freeworks/Work214"));
const Work215 = lazy(() => import("./finishedworks/freeworks/Work215"));
const Work216 = lazy(() => import("./finishedworks/freeworks/Work216"));
const Work217 = lazy(() => import("./finishedworks/freeworks/Work217"));
const Work218 = lazy(() => import("./finishedworks/freeworks/Work218"));
const Work219 = lazy(() => import("./finishedworks/freeworks/Work219"));
const Work220 = lazy(() => import("./finishedworks/freeworks/Work220"));
const Work221 = lazy(() => import("./finishedworks/freeworks/Work221"));
const Work222 = lazy(() => import("./finishedworks/freeworks/Work222"));
const Work223 = lazy(() => import("./finishedworks/freeworks/Work223"));
const Work224 = lazy(() => import("./finishedworks/freeworks/Work224"));
const Work225 = lazy(() => import("./finishedworks/freeworks/Work225"));
const Work226 = lazy(() => import("./finishedworks/freeworks/Work226"));
const Work227 = lazy(() => import("./finishedworks/freeworks/Work227"));
const Work228 = lazy(() => import("./finishedworks/freeworks/Work228"));
const Work229 = lazy(() => import("./finishedworks/freeworks/Work229"));
const Work230 = lazy(() => import("./finishedworks/freeworks/Work230"));
const Work231 = lazy(() => import("./finishedworks/freeworks/Work231"));
const Work232 = lazy(() => import("./finishedworks/freeworks/Work232"));
const Work233 = lazy(() => import("./finishedworks/freeworks/Work233"));
const Work234 = lazy(() => import("./finishedworks/freeworks/Work234"));
const Work235 = lazy(() => import("./finishedworks/freeworks/Work235"));
const Work236 = lazy(() => import("./finishedworks/freeworks/Work236"));
const Work237 = lazy(() => import("./finishedworks/freeworks/Work237"));
const Work238 = lazy(() => import("./finishedworks/freeworks/Work238"));
const Work239 = lazy(() => import("./finishedworks/freeworks/Work239"));
const Work240 = lazy(() => import("./finishedworks/freeworks/Work240"));
const Work241 = lazy(() => import("./finishedworks/freeworks/Work241"));
const Work242 = lazy(() => import("./finishedworks/freeworks/Work242"));
const Work243 = lazy(() => import("./finishedworks/freeworks/Work243"));
const Work244 = lazy(() => import("./finishedworks/freeworks/Work244"));
const Work245 = lazy(() => import("./finishedworks/freeworks/Work245"));
const Work246 = lazy(() => import("./finishedworks/freeworks/Work246"));
const Work247 = lazy(() => import("./finishedworks/freeworks/Work247"));
const Work248 = lazy(() => import("./finishedworks/freeworks/Work248"));
const Work249 = lazy(() => import("./finishedworks/freeworks/Work249"));
const Work250 = lazy(() => import("./finishedworks/freeworks/Work250"));
const Work251 = lazy(() => import("./finishedworks/freeworks/Work251"));
const Work252 = lazy(() => import("./finishedworks/freeworks/Work252"));
const Work253 = lazy(() => import("./finishedworks/freeworks/Work253"));
const Work254 = lazy(() => import("./finishedworks/freeworks/Work254"));
const Work255 = lazy(() => import("./finishedworks/freeworks/Work255"));
const Work256 = lazy(() => import("./finishedworks/freeworks/Work256"));
const Work257 = lazy(() => import("./finishedworks/freeworks/Work257"));
const Work258 = lazy(() => import("./finishedworks/freeworks/Work258"));
const Work259 = lazy(() => import("./finishedworks/freeworks/Work259"));
const Work260 = lazy(() => import("./finishedworks/freeworks/Work260"));
const Work261 = lazy(() => import("./finishedworks/freeworks/Work261"));
const Work262 = lazy(() => import("./finishedworks/freeworks/Work262"));
const Work263 = lazy(() => import("./finishedworks/freeworks/Work263"));
const Work264 = lazy(() => import("./finishedworks/freeworks/Work264"));
const Work265 = lazy(() => import("./finishedworks/freeworks/Work265"));
const Work266 = lazy(() => import("./finishedworks/freeworks/Work266"));
const Work267 = lazy(() => import("./finishedworks/freeworks/Work267"));
const Work268 = lazy(() => import("./finishedworks/freeworks/Work268"));
const Work269 = lazy(() => import("./finishedworks/freeworks/Work269"));
const Work270 = lazy(() => import("./finishedworks/freeworks/Work270"));
const Work271 = lazy(() => import("./finishedworks/freeworks/Work271"));
const Work272 = lazy(() => import("./finishedworks/freeworks/Work272"));
const Work273 = lazy(() => import("./finishedworks/freeworks/Work273"));
const Work274 = lazy(() => import("./finishedworks/freeworks/Work274"));
const Work275 = lazy(() => import("./finishedworks/freeworks/Work275"));
const Work276 = lazy(() => import("./finishedworks/freeworks/Work276"));
const Work277 = lazy(() => import("./finishedworks/freeworks/Work277"));
const Work278 = lazy(() => import("./finishedworks/freeworks/Work278"));
const Work279 = lazy(() => import("./finishedworks/freeworks/Work279"));
const Work280 = lazy(() => import("./finishedworks/freeworks/Work280"));
const Work281 = lazy(() => import("./finishedworks/freeworks/Work281"));
const Work282 = lazy(() => import("./finishedworks/freeworks/Work282"));
const Work283 = lazy(() => import("./finishedworks/freeworks/Work283"));
const Work284 = lazy(() => import("./finishedworks/freeworks/Work284"));
const Work285 = lazy(() => import("./finishedworks/freeworks/Work285"));
const Work286 = lazy(() => import("./finishedworks/freeworks/Work286"));
const Work287 = lazy(() => import("./finishedworks/freeworks/Work287"));
const Work288 = lazy(() => import("./finishedworks/freeworks/Work288"));
const Work289 = lazy(() => import("./finishedworks/freeworks/Work289"));
const Work290 = lazy(() => import("./finishedworks/freeworks/Work290"));
const Work291 = lazy(() => import("./finishedworks/freeworks/Work291"));
const Work292 = lazy(() => import("./finishedworks/freeworks/Work292"));
const Work293 = lazy(() => import("./finishedworks/freeworks/Work293"));
const Work294 = lazy(() => import("./finishedworks/freeworks/Work294"));
const Work295 = lazy(() => import("./finishedworks/freeworks/Work295"));
const Work296 = lazy(() => import("./finishedworks/freeworks/Work296"));
const Work297 = lazy(() => import("./finishedworks/freeworks/Work297"));
const Work298 = lazy(() => import("./finishedworks/freeworks/Work298"));
const Work299 = lazy(() => import("./finishedworks/freeworks/Work299"));
const Work300 = lazy(() => import("./finishedworks/freeworks/Work300"));
const Work301 = lazy(() => import("./finishedworks/freeworks/Work301"));
const Work302 = lazy(() => import("./finishedworks/freeworks/Work302"));
const Work303 = lazy(() => import("./finishedworks/freeworks/Work303"));
const Work304 = lazy(() => import("./finishedworks/freeworks/Work304"));
const Work305 = lazy(() => import("./finishedworks/freeworks/Work305"));
const Work306 = lazy(() => import("./finishedworks/freeworks/Work306"));
const Work307 = lazy(() => import("./finishedworks/freeworks/Work307"));
const Work308 = lazy(() => import("./finishedworks/freeworks/Work308"));
const Work309 = lazy(() => import("./finishedworks/freeworks/Work309"));
const Work310 = lazy(() => import("./finishedworks/freeworks/Work310"));
const Work311 = lazy(() => import("./finishedworks/freeworks/Work311"));
const Work312 = lazy(() => import("./finishedworks/freeworks/Work312"));
const Work313 = lazy(() => import("./finishedworks/freeworks/Work313"));
const Work314 = lazy(() => import("./finishedworks/freeworks/Work314"));
const Work315 = lazy(() => import("./finishedworks/freeworks/Work315"));
const Work316 = lazy(() => import("./finishedworks/freeworks/Work316"));
const Work317 = lazy(() => import("./finishedworks/freeworks/Work317"));
const Work318 = lazy(() => import("./finishedworks/freeworks/Work318"));
const Work319 = lazy(() => import("./finishedworks/freeworks/Work319"));
const Work320 = lazy(() => import("./finishedworks/freeworks/Work320"));
const Work321 = lazy(() => import("./finishedworks/freeworks/Work321"));
const Work322 = lazy(() => import("./finishedworks/freeworks/Work322"));
const Work323 = lazy(() => import("./finishedworks/freeworks/Work323"));
const Work324 = lazy(() => import("./finishedworks/freeworks/Work324"));
const Work325 = lazy(() => import("./finishedworks/freeworks/Work325"));
const Work326 = lazy(() => import("./finishedworks/freeworks/Work326"));
const Work327 = lazy(() => import("./finishedworks/freeworks/Work327"));
const Work328 = lazy(() => import("./finishedworks/freeworks/Work328"));
const Work329 = lazy(() => import("./finishedworks/freeworks/Work329"));
const Work330 = lazy(() => import("./finishedworks/freeworks/Work330"));
const Work331 = lazy(() => import("./finishedworks/freeworks/Work331"));
const Work332 = lazy(() => import("./finishedworks/freeworks/Work332"));
const Work333 = lazy(() => import("./finishedworks/freeworks/Work333"));
const Work334 = lazy(() => import("./finishedworks/freeworks/Work334"));
const Work335 = lazy(() => import("./finishedworks/freeworks/Work335"));
const Work336 = lazy(() => import("./finishedworks/freeworks/Work336"));
const Work337 = lazy(() => import("./finishedworks/freeworks/Work337"));
const Work338 = lazy(() => import("./finishedworks/freeworks/Work338"));
const Work339 = lazy(() => import("./finishedworks/freeworks/Work339"));
const Work340 = lazy(() => import("./finishedworks/freeworks/Work340"));
const Work341 = lazy(() => import("./finishedworks/freeworks/Work341"));
const Work342 = lazy(() => import("./finishedworks/freeworks/Work342"));
const Work343 = lazy(() => import("./finishedworks/freeworks/Work343"));
const Work344 = lazy(() => import("./finishedworks/freeworks/Work344"));
const Work345 = lazy(() => import("./finishedworks/freeworks/Work345"));
const Work346 = lazy(() => import("./finishedworks/freeworks/Work346"));
const Work347 = lazy(() => import("./finishedworks/freeworks/Work347"));
const Work348 = lazy(() => import("./finishedworks/freeworks/Work348"));
const Work349 = lazy(() => import("./finishedworks/freeworks/Work349"));
const Work350 = lazy(() => import("./finishedworks/freeworks/Work350"));
const Work351 = lazy(() => import("./finishedworks/freeworks/Work351"));
const Work352 = lazy(() => import("./finishedworks/freeworks/Work352"));
const Work353 = lazy(() => import("./finishedworks/freeworks/Work353"));
const Work354 = lazy(() => import("./finishedworks/freeworks/Work354"));
const Work355 = lazy(() => import("./finishedworks/freeworks/Work355"));
const Work356 = lazy(() => import("./finishedworks/freeworks/Work356"));
const Work357 = lazy(() => import("./finishedworks/freeworks/Work357"));
const Work358 = lazy(() => import("./finishedworks/freeworks/Work358"));
const Work359 = lazy(() => import("./finishedworks/freeworks/Work359"));
const Work360 = lazy(() => import("./finishedworks/freeworks/Work360"));
const Work361 = lazy(() => import("./finishedworks/freeworks/Work361"));
const Work362 = lazy(() => import("./finishedworks/freeworks/Work362"));
const Work363 = lazy(() => import("./finishedworks/freeworks/Work363"));
const Work364 = lazy(() => import("./finishedworks/freeworks/Work364"));
const Work365 = lazy(() => import("./finishedworks/freeworks/Work365"));
const Work366 = lazy(() => import("./finishedworks/freeworks/Work366"));
const Work367 = lazy(() => import("./finishedworks/freeworks/Work367"));
const Work368 = lazy(() => import("./finishedworks/freeworks/Work368"));
const Work369 = lazy(() => import("./finishedworks/freeworks/Work369"));
const Work370 = lazy(() => import("./finishedworks/freeworks/Work370"));
const Work371 = lazy(() => import("./finishedworks/freeworks/Work371"));
const Work372 = lazy(() => import("./finishedworks/freeworks/Work372"));
const Work373 = lazy(() => import("./finishedworks/freeworks/Work373"));
const Work374 = lazy(() => import("./finishedworks/freeworks/Work374"));
const Work375 = lazy(() => import("./finishedworks/freeworks/Work375"));
const Work376 = lazy(() => import("./finishedworks/freeworks/Work376"));
const Work377 = lazy(() => import("./finishedworks/freeworks/Work377"));
const Work378 = lazy(() => import("./finishedworks/freeworks/Work378"));
const Work379 = lazy(() => import("./finishedworks/freeworks/Work379"));
const Work380 = lazy(() => import("./finishedworks/freeworks/Work380"));
const Work381 = lazy(() => import("./finishedworks/freeworks/Work381"));
const Work382 = lazy(() => import("./finishedworks/freeworks/Work382"));
const Work383 = lazy(() => import("./finishedworks/freeworks/Work383"));
const Work384 = lazy(() => import("./finishedworks/freeworks/Work384"));
const Work385 = lazy(() => import("./finishedworks/freeworks/Work385"));
const Work386 = lazy(() => import("./finishedworks/freeworks/Work386"));
const Work387 = lazy(() => import("./finishedworks/freeworks/Work387"));
const Work388 = lazy(() => import("./finishedworks/freeworks/Work388"));
const Work389 = lazy(() => import("./finishedworks/freeworks/Work389"));
const Work390 = lazy(() => import("./finishedworks/freeworks/Work390"));
const Work391 = lazy(() => import("./finishedworks/freeworks/Work391"));
const Work392 = lazy(() => import("./finishedworks/freeworks/Work392"));
const Work393 = lazy(() => import("./finishedworks/freeworks/Work393"));
const Work394 = lazy(() => import("./finishedworks/freeworks/Work394"));
const Work395 = lazy(() => import("./finishedworks/freeworks/Work395"));
const Work396 = lazy(() => import("./finishedworks/freeworks/Work396"));
const Work397 = lazy(() => import("./finishedworks/freeworks/Work397"));
const Work398 = lazy(() => import("./finishedworks/freeworks/Work398"));
const Work399 = lazy(() => import("./finishedworks/freeworks/Work399"));
const Work400 = lazy(() => import("./finishedworks/freeworks/Work400"));
const Work401 = lazy(() => import("./finishedworks/freeworks/Work401"));
const Work402 = lazy(() => import("./finishedworks/freeworks/Work402"));
const Work403 = lazy(() => import("./finishedworks/freeworks/Work403"));

function App() {
  let statenow = useSelector((dat) => dat);
  let keyfreework = useSelector((dat) => dat.keyfreework);
  let stateadmin = useSelector((dat) => dat.adminpanel);

  return (
    <div className="container-fluid p-0 mainconteiner">
      <div className={stateadmin ? "wrap_admin" : "wrap"}>
        <BrowserRouter>
          <Header />
          <Suspense fallback={<div>Загрузка...</div>}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/kontacts" element={<Kontacts />} />
              <Route path="/helper" element={<Helper />} />
              <Route path="/guarantees" element={<Guarantees />} />
              <Route path="/finishedworks" element={<Finishedworks />}>
                <Route index element={<Page1 />} />
                <Route path="page1" element={<Page1 />} />
                <Route path="page2" element={<Page2 />} />
                <Route path="page3" element={<Page3 />} />
                <Route path="page4" element={<Page4 />} />
                <Route path="page5" element={<Page5 />} />
                <Route path="page6" element={<Page6 />} />
                <Route path="page7" element={<Page7 />} />
                <Route path="page8" element={<Page8 />} />
                <Route path="page9" element={<Page9 />} />
                <Route path="page10" element={<Page10 />} />
                <Route path="page11" element={<Page11 />} />

                <Route path="101" element={<Work101 />} />
                <Route path="102" element={<Work102 />} />
                <Route path="103" element={<Work103 />} />
                <Route path="104" element={<Work104 />} />
                <Route path="105" element={<Work105 />} />
                <Route path="106" element={<Work106 />} />
                <Route path="107" element={<Work107 />} />
                <Route path="108" element={<Work108 />} />
                <Route path="109" element={<Work109 />} />
                <Route path="110" element={<Work110 />} />
                <Route path="111" element={<Work111 />} />
                <Route path="112" element={<Work112 />} />
                <Route path="113" element={<Work113 />} />
                <Route path="114" element={<Work114 />} />
                <Route path="115" element={<Work115 />} />
                <Route path="116" element={<Work116 />} />
                <Route path="117" element={<Work117 />} />
                <Route path="118" element={<Work118 />} />
                <Route path="119" element={<Work119 />} />
                <Route path="120" element={<Work120 />} />
                <Route path="121" element={<Work121 />} />
                <Route path="122" element={<Work122 />} />
                <Route path="123" element={<Work123 />} />
                <Route path="124" element={<Work124 />} />
                <Route path="125" element={<Work125 />} />
                <Route path="126" element={<Work126 />} />
                <Route path="127" element={<Work127 />} />
                <Route path="128" element={<Work128 />} />
                <Route path="129" element={<Work129 />} />
                <Route path="130" element={<Work130 />} />
                <Route path="131" element={<Work131 />} />
                <Route path="132" element={<Work132 />} />
                <Route path="133" element={<Work133 />} />
                <Route path="134" element={<Work134 />} />
                <Route path="135" element={<Work135 />} />
                <Route path="136" element={<Work136 />} />
                <Route path="137" element={<Work137 />} />
                <Route path="138" element={<Work138 />} />
                <Route path="139" element={<Work139 />} />
                <Route path="140" element={<Work140 />} />
                <Route path="141" element={<Work141 />} />
                <Route path="142" element={<Work142 />} />
                <Route path="143" element={<Work143 />} />
                <Route path="144" element={<Work144 />} />
                <Route path="145" element={<Work145 />} />
                <Route path="146" element={<Work146 />} />
                <Route path="147" element={<Work147 />} />
                <Route path="148" element={<Work148 />} />
                <Route path="149" element={<Work149 />} />
                <Route path="150" element={<Work150 />} />
                <Route path="151" element={<Work151 />} />
                <Route path="152" element={<Work152 />} />
                <Route path="153" element={<Work153 />} />
                <Route path="154" element={<Work154 />} />
                <Route path="155" element={<Work155 />} />
                <Route path="156" element={<Work156 />} />
                <Route path="157" element={<Work157 />} />
                <Route path="158" element={<Work158 />} />
                <Route path="159" element={<Work159 />} />
                <Route path="160" element={<Work160 />} />
                <Route path="161" element={<Work161 />} />
                <Route path="162" element={<Work162 />} />
                <Route path="163" element={<Work163 />} />
                <Route path="164" element={<Work164 />} />
                <Route path="165" element={<Work165 />} />
                <Route path="166" element={<Work166 />} />
                <Route path="167" element={<Work167 />} />
                <Route path="168" element={<Work168 />} />
                <Route path="169" element={<Work169 />} />
                <Route path="170" element={<Work170 />} />
                <Route path="171" element={<Work171 />} />
                <Route path="172" element={<Work172 />} />
                <Route path="173" element={<Work173 />} />
                <Route path="174" element={<Work174 />} />
                <Route path="175" element={<Work175 />} />
                <Route path="176" element={<Work176 />} />
                <Route path="177" element={<Work177 />} />
                <Route path="178" element={<Work178 />} />
                <Route path="179" element={<Work179 />} />
                <Route path="180" element={<Work180 />} />
                <Route path="181" element={<Work181 />} />
                <Route path="182" element={<Work182 />} />
                <Route path="183" element={<Work183 />} />
                <Route path="184" element={<Work184 />} />
                <Route path="185" element={<Work185 />} />
                <Route path="186" element={<Work186 />} />
                <Route path="187" element={<Work187 />} />
                <Route path="188" element={<Work188 />} />
                <Route path="189" element={<Work189 />} />
                <Route path="190" element={<Work190 />} />
                <Route path="191" element={<Work191 />} />
                <Route path="192" element={<Work192 />} />
                <Route path="193" element={<Work193 />} />
                <Route path="194" element={<Work194 />} />
                <Route path="195" element={<Work195 />} />
                <Route path="196" element={<Work196 />} />
                <Route path="197" element={<Work197 />} />
                <Route path="198" element={<Work198 />} />
                <Route path="199" element={<Work199 />} />
                <Route path="200" element={<Work200 />} />
                <Route path="201" element={<Work201 />} />
                <Route path="202" element={<Work202 />} />
                <Route path="203" element={<Work203 />} />
                <Route path="204" element={<Work204 />} />
                <Route path="205" element={<Work205 />} />
                <Route path="206" element={<Work206 />} />
                <Route path="207" element={<Work207 />} />
                <Route path="208" element={<Work208 />} />
                <Route path="209" element={<Work209 />} />
                <Route path="210" element={<Work210 />} />
                <Route path="211" element={<Work211 />} />
                <Route path="212" element={<Work212 />} />
                <Route path="213" element={<Work213 />} />
                <Route path="214" element={<Work214 />} />
                <Route path="215" element={<Work215 />} />
                <Route path="216" element={<Work216 />} />
                <Route path="217" element={<Work217 />} />
                <Route path="218" element={<Work218 />} />
                <Route path="219" element={<Work219 />} />
                <Route path="220" element={<Work220 />} />
                <Route path="221" element={<Work221 />} />
                <Route path="222" element={<Work222 />} />
                <Route path="223" element={<Work223 />} />
                <Route path="224" element={<Work224 />} />
                <Route path="225" element={<Work225 />} />
                <Route path="226" element={<Work226 />} />
                <Route path="227" element={<Work227 />} />
                <Route path="228" element={<Work228 />} />
                <Route path="229" element={<Work229 />} />
                <Route path="230" element={<Work230 />} />
                <Route path="231" element={<Work231 />} />
                <Route path="232" element={<Work232 />} />
                <Route path="233" element={<Work233 />} />
                <Route path="234" element={<Work234 />} />
                <Route path="235" element={<Work235 />} />
                <Route path="236" element={<Work236 />} />
                <Route path="237" element={<Work237 />} />
                <Route path="238" element={<Work238 />} />
                <Route path="239" element={<Work239 />} />
                <Route path="240" element={<Work240 />} />
                <Route path="241" element={<Work241 />} />
                <Route path="242" element={<Work242 />} />
                <Route path="243" element={<Work243 />} />
                <Route path="244" element={<Work244 />} />
                <Route path="245" element={<Work245 />} />
                <Route path="246" element={<Work246 />} />
                <Route path="247" element={<Work247 />} />
                <Route path="248" element={<Work248 />} />
                <Route path="249" element={<Work249 />} />
                <Route path="250" element={<Work250 />} />
                <Route path="251" element={<Work251 />} />
                <Route path="252" element={<Work252 />} />
                <Route path="253" element={<Work253 />} />
                <Route path="254" element={<Work254 />} />
                <Route path="255" element={<Work255 />} />
                <Route path="256" element={<Work256 />} />
                <Route path="257" element={<Work257 />} />
                <Route path="258" element={<Work258 />} />
                <Route path="259" element={<Work259 />} />
                <Route path="260" element={<Work260 />} />
                <Route path="261" element={<Work261 />} />
                <Route path="262" element={<Work262 />} />
                <Route path="263" element={<Work263 />} />
                <Route path="264" element={<Work264 />} />
                <Route path="265" element={<Work265 />} />
                <Route path="266" element={<Work266 />} />
                <Route path="267" element={<Work267 />} />
                <Route path="268" element={<Work268 />} />
                <Route path="269" element={<Work269 />} />
                <Route path="270" element={<Work270 />} />
                <Route path="271" element={<Work271 />} />
                <Route path="272" element={<Work272 />} />
                <Route path="273" element={<Work273 />} />
                <Route path="274" element={<Work274 />} />
                <Route path="275" element={<Work275 />} />
                <Route path="276" element={<Work276 />} />
                <Route path="277" element={<Work277 />} />
                <Route path="278" element={<Work278 />} />
                <Route path="279" element={<Work279 />} />
                <Route path="280" element={<Work280 />} />
                <Route path="281" element={<Work281 />} />
                <Route path="282" element={<Work282 />} />
                <Route path="283" element={<Work283 />} />
                <Route path="284" element={<Work284 />} />
                <Route path="285" element={<Work285 />} />
                <Route path="286" element={<Work286 />} />
                <Route path="287" element={<Work287 />} />
                <Route path="288" element={<Work288 />} />
                <Route path="289" element={<Work289 />} />
                <Route path="290" element={<Work290 />} />
                <Route path="291" element={<Work291 />} />
                <Route path="292" element={<Work292 />} />
                <Route path="293" element={<Work293 />} />
                <Route path="294" element={<Work294 />} />
                <Route path="295" element={<Work295 />} />
                <Route path="296" element={<Work296 />} />
                <Route path="297" element={<Work297 />} />
                <Route path="298" element={<Work298 />} />
                <Route path="299" element={<Work299 />} />
                <Route path="300" element={<Work300 />} />
                <Route path="301" element={<Work301 />} />
                <Route path="302" element={<Work302 />} />
                <Route path="303" element={<Work303 />} />
                <Route path="304" element={<Work304 />} />
                <Route path="305" element={<Work305 />} />
                <Route path="306" element={<Work306 />} />
                <Route path="307" element={<Work307 />} />
                <Route path="308" element={<Work308 />} />
                <Route path="309" element={<Work309 />} />
                <Route path="310" element={<Work310 />} />
                <Route path="311" element={<Work311 />} />
                <Route path="312" element={<Work312 />} />
                <Route path="313" element={<Work313 />} />
                <Route path="314" element={<Work314 />} />
                <Route path="315" element={<Work315 />} />
                <Route path="316" element={<Work316 />} />
                <Route path="317" element={<Work317 />} />
                <Route path="318" element={<Work318 />} />
                <Route path="319" element={<Work319 />} />
                <Route path="320" element={<Work320 />} />
                <Route path="321" element={<Work321 />} />
                <Route path="322" element={<Work322 />} />
                <Route path="323" element={<Work323 />} />
                <Route path="324" element={<Work324 />} />
                <Route path="325" element={<Work325 />} />
                <Route path="326" element={<Work326 />} />
                <Route path="327" element={<Work327 />} />
                <Route path="328" element={<Work328 />} />
                <Route path="329" element={<Work329 />} />
                <Route path="330" element={<Work330 />} />
                <Route path="331" element={<Work331 />} />
                <Route path="332" element={<Work332 />} />
                <Route path="333" element={<Work333 />} />
                <Route path="334" element={<Work334 />} />
                <Route path="335" element={<Work335 />} />
                <Route path="336" element={<Work336 />} />
                <Route path="337" element={<Work337 />} />
                <Route path="338" element={<Work338 />} />
                <Route path="339" element={<Work339 />} />
                <Route path="340" element={<Work340 />} />
                <Route path="341" element={<Work341 />} />
                <Route path="342" element={<Work342 />} />
                <Route path="343" element={<Work343 />} />
                <Route path="344" element={<Work344 />} />
                <Route path="345" element={<Work345 />} />
                <Route path="346" element={<Work346 />} />
                <Route path="347" element={<Work347 />} />
                <Route path="348" element={<Work348 />} />
                <Route path="349" element={<Work349 />} />
                <Route path="350" element={<Work350 />} />
                <Route path="351" element={<Work351 />} />
                <Route path="352" element={<Work352 />} />
                <Route path="353" element={<Work353 />} />
                <Route path="354" element={<Work354 />} />
                <Route path="355" element={<Work355 />} />
                <Route path="356" element={<Work356 />} />
                <Route path="357" element={<Work357 />} />
                <Route path="358" element={<Work358 />} />
                <Route path="359" element={<Work359 />} />
                <Route path="360" element={<Work360 />} />
                <Route path="361" element={<Work361 />} />
                <Route path="362" element={<Work362 />} />
                <Route path="363" element={<Work363 />} />
                <Route path="364" element={<Work364 />} />
                <Route path="365" element={<Work365 />} />
                <Route path="366" element={<Work366 />} />
                <Route path="367" element={<Work367 />} />
                <Route path="368" element={<Work368 />} />
                <Route path="369" element={<Work369 />} />
                <Route path="370" element={<Work370 />} />
                <Route path="371" element={<Work371 />} />
                <Route path="372" element={<Work372 />} />
                <Route path="373" element={<Work373 />} />
                <Route path="374" element={<Work374 />} />
                <Route path="375" element={<Work375 />} />
                <Route path="376" element={<Work376 />} />
                <Route path="377" element={<Work377 />} />
                <Route path="378" element={<Work378 />} />
                <Route path="379" element={<Work379 />} />
                <Route path="380" element={<Work380 />} />
                <Route path="381" element={<Work381 />} />
                <Route path="382" element={<Work382 />} />
                <Route path="383" element={<Work383 />} />
                <Route path="384" element={<Work384 />} />
                <Route path="385" element={<Work385 />} />
                <Route path="386" element={<Work386 />} />
                <Route path="387" element={<Work387 />} />
                <Route path="388" element={<Work388 />} />
                <Route path="389" element={<Work389 />} />
                <Route path="390" element={<Work390 />} />
                <Route path="391" element={<Work391 />} />
                <Route path="392" element={<Work392 />} />
                <Route path="393" element={<Work393 />} />
                <Route path="394" element={<Work394 />} />
                <Route path="395" element={<Work395 />} />
                <Route path="396" element={<Work396 />} />
                <Route path="397" element={<Work397 />} />
                <Route path="398" element={<Work398 />} />
                <Route path="399" element={<Work399 />} />
                <Route path="400" element={<Work400 />} />
                <Route path="401" element={<Work401 />} />
                <Route path="402" element={<Work402 />} />
                <Route path="403" element={<Work403 />} />
              </Route>

              <Route
                path="/adminpanel"
                element={statenow.adminpanel ? <Addfreeworks /> : <Navigate to="/" />}
              />
              <Route
                path="/personal_area"
                element={statenow.userstate !== "" ? <Personal_area /> : <Navigate to="/" />}
              />
              {/* <Route path={`/finishedworks/${keyfreework}`} element={<Outworks />} /> */}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
