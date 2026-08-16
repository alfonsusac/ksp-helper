import { cns } from "@/design-system"
import { Divider } from "@/ui/common"
import { Footer } from "@/ui/footer"
import { LucideArrowUpRight } from "@/ui/icons"
import Link from "next/link"
import { Fragment } from "react/jsx-runtime"

export default function HomePage() {
  return (
    <main className={cns.page()}>

      <header className="flex flex-col gap-1">
        <h1 className={cns.pageTitle("text-2xl")}>KSP Tools</h1>
        <p className={cns.text.muted()}>Tools to help play Kerbal Space Program</p>
      </header>


      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {
          [
            {
              href: "/antenna-range", thumb: "/icon.png", title: "Maximum Antenna Range Calculator",
              desc: "Calculate the maximum range of antennas between two vessels",
              beta: false,
            },
            {
              href: "/relay-height", thumb: "/relay-height/icon.png", title: "Ideal Relay Height",
              desc: "Get the ideal height for a relay network",
              beta: true,
            },
          ].map((o) => {
            return (
              <Link
                key={o.href}
                href={o.href}
                className={cns.linkCard("flex gap-4 p-4 rounded-xl")}>
                <div className="size-10 sm:size-16 shrink-0">
                  <img src={o.thumb} />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="leading-4">{o.title}{o.beta && <span className={cns.text.muted("ml-1 text-xs")}>beta</span>}</div>
                  <div className={cns.text.muted("text-sm leading-3.5")}>{o.desc}</div>
                </div>
              </Link>
            )
          })
        }
      </div>


      <header className={cns.text.base("pt-24 -mb-16")}>
        Community Tools
        <div className={cns.text.muted("")}>Web-based tools made by the KSP community</div>
      </header>

      {communityCalculators.map((g, gi) => {
        return (
          <Fragment key={gi}>
            <div className={cns.text.base("text-sm opacity-75 mt-24")}>{g.title}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {g.items.map((p, pi) => <CommunityProjectLink key={pi} {...p} />)}
            </div>
          </Fragment>
        )
      })}

      {/* <div className={cns.text.muted("text-xs opacity-75 pt-0.5")}>Last Updated {new Date().toDateString()}</div> */}
      <div className={cns.text.muted("text-xs opacity-75 pt-0.5")}>Last Updated <LastUpdatedPrerenderTime /></div>

      <div className="grow" />

      <Divider className="my-12" />


      <Footer />
    </main>
  )
}

export function LastUpdatedPrerenderTime() {
  return <>
    {new Date().toDateString()}
  </>
}

const communityCalculators: {
  title: string,
  items: {
    href: string,
    thumb: string,
    title: string,
    desc: string,
    author: string,
    kspForum?: string,
    sourceCode?: string,
    redditPost?: string,
    lastUpdated?: string
  }[]
}[] = [
    {
      title: "Transfer Planner",
      items: [
        {
          href: "https://kerbal-transfer-illustrator.netlify.app/",
          thumb: "/comproj/kti.png",
          title: "Kerbal Transfer Illustrator",
          desc: "Online tools for calculating, optimizing, and visualizing interplanetary transfers and multi-flyby trajectories for Kerbal Space Program.",
          author: "theAstrogoth",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/207250-web-kerbal-transfer-illustrator-a-mission-planning-tool/",
          sourceCode: "https://github.com/theastrogoth/Kerbal-Transfer-Illustrator",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/tccha5/i_made_a_web_app_thats_like_the_launch_window/",
          lastUpdated: "Mar 2023"
        },
        {
          href: "https://nmisyats.github.io/KSP-MGA-Planner/",
          thumb: "/comproj/mga.png",
          title: "Multiple Gravity Assist Trajectory Planner",
          desc: "Calculates a (potentially) optimal interplanetary trajectory with multiple gravity assists.",
          author: "Krafpy",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/204391-online-calculator-for-trajectories-with-multiple-gravity-assists/",
          sourceCode: "https://github.com/nmisyats/KSP-MGA-Planner",
          lastUpdated: "July 2022"
        },
        {
          href: "https://ksp.olex.biz/",
          thumb: "/comproj/iiigac.png",
          title: "Interactive illustrated interplanetary guide and calculator",
          desc: "Calculates Δv and angles for orbital transfer between celestial bodies.",
          author: "Olex",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/16413-tutorial-interplanetary-how-to-guide/",
          lastUpdated: "2013"
        },
        {
          href: "https://ksp-visual-calculator.blaarkies.com/",
          thumb: "/comproj/kvc.png",
          title: "KSP Visual Calculator",
          desc: "Interactively visualizes delta v and communication networks on a KSP universe map.",
          author: "Blaarkies",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/202030-ksp-visual-calculator/",
          sourceCode: "https://github.com/Blaarkies/ksp-visual-calculator",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/qtn3rd/i_made_a_deltav_calculator_for_ksp_it_allows_you/",
          lastUpdated: "2021"
        },
        {
          href: "https://alexmoon.github.io/ksp",
          thumb: "/comproj/lwp.png",
          title: "Launch Window Planner",
          desc: "Provides a total Δv calculation for orbital transfer based on launch parameters.",
          author: "alexmoon",
          sourceCode: "https://github.com/alexmoon/ksp",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/30367-web-app-launch-window-planner/",
          lastUpdated: "6 Apr 2014"
        },
        {
          href: "https://suppise-dv-calculator.com/",
          thumb: "/comproj/sdc.png",
          title: "Delta-V Calculator",
          desc: "Interactive ΔV map",
          author: "Suppise",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/1ahi8gf/v1400_of_my_dv_calculator_website_is_now_live_you/",
          lastUpdated: "10 May 2026"
        },
        {
          href: "https://donlion.github.io/ksp-delta-v",
          thumb: "/comproj/yadp.png",
          title: "KSP Δv Planenr",
          desc: "",
          author: "donlion",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/1rycyhh/yet_another_deltav_planner/",
          sourceCode: "https://github.com/donlion/ksp-delta-v",
          lastUpdated: "20 Mar 2026",
        },
        {
          href: "https://www.deltacalculator.com/ksp/deltavcalculator",
          thumb: "/comproj/dvc.png",
          title: "Delta-V Calculator",
          desc: "Plan maneuvers between different orbits of the same planet or between different planets",
          author: "f3rpas",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/pfspmo/my_new_deltav_calculatorplanner/",
          lastUpdated: "1 Sept 2021"
        },
        {
          href: "https://deltavmap.github.io",
          thumb: "/comproj/dvm.png",
          title: "Delta V Map",
          desc: "",
          author: "jsmcgd",
          redditPost: "https://www.reddit.com/r/Colonizemars/comments/ns7clu/interactive_delta_v_map_of_the_solar_system/"
        },
        {
          href: "https://ksp.loicviennois.com/",
          thumb: "/comproj/dvp.png",
          title: "Delta-V Planner",
          desc: "A KSP Delta-V Planner with an interactive Delta-V map",
          author: "LoicViennois",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/cmu3qj/a_ksp_deltav_planner_with_an_interactive_deltav/",
          sourceCode: "https://github.com/LoicViennois/KSP-DeltaV-Planner",
          lastUpdated: "11 May 2026",
        },
        {
          href: "https://arolauntech.github.io/kspmga/",
          thumb: "https://i.imgur.com/TMfQ79n.png",
          title: "KSPMGA",
          desc: "A tool for planning gravity assists in KSP",
          author: "Arolauntech",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/229533-web-kspmga-a-tool-for-planning-gravity-assists-in-ksp-version-032/",
          sourceCode: "https://github.com/ArolaunTech/kspmga",
          lastUpdated: "17 Feb 2026",

        }

      ]
    },
    {
      title: "Relay Communication",
      items: [
        {
          href: "https://westbrooke117.github.io/KSPSSC/",
          thumb: "/comproj/ssc.png",
          title: "KSP Signal Strength Calculator",
          desc: "A website to assist calculating maximum and minimum CommNet relay and signal distances.",
          author: "Westbrooke117",
          sourceCode: "https://github.com/Westbrooke117/KSPSSC",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/1bwcjlz/comment/ky8o6sm",
          lastUpdated: "17 Sept 2021"
        },
        {
          href: "https://meyerweb.com/eric/ksp/resonant-orbits/",
          thumb: "/comproj/roc.png",
          title: "Resonant Orbit Calculator",
          desc: "Calculate the resonant orbit needed for a carrier craft to inject craft it carries, like satellites, into equidistant positions of a shared circular orbit.",
          author: "Eric Meyer",
          lastUpdated: "2017",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/156018-resonant-orbit-calculator-v14/",
        },
        {
          href: "https://grparrot.github.io/KSP-Relay-Calculator/",
          thumb: "/comproj/rnc.png",
          title: "Resonant Orbit Calculator",
          desc: "A tool to plan relay network formations in KSP.",
          author: "GrParrot",
          lastUpdated: "22 Jan 2026",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/1qj7b0d/i_made_a_relay_network_calculator_for_ksp/",
          sourceCode: "https://github.com/GrParrot/KSP-Relay-Calculator",
        },
        {
          href: "https://mattadee-uk.github.io/commnet-calculator/",
          thumb: "/comproj/cnc.png",
          title: "CommNet Calculator",
          desc: "Check the required signal strength for any DSN connection, and scale the power of your probes and relays to maintain contact with the KSC.",
          author: "Mattadee",
          lastUpdated: "10 Jun 2026",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/1u1ibtx/i_made_a_dsn_calculator_for_building_probes/",
        },
        {
          author: "TreeusBarkus",
          thumb: "/comproj/roc2.png",
          title: "Resonant Orbit Calculator",
          desc: "A comprehensive Orbital Resonance Calculator for KSP 1 with built in mod support.",
          href: "https://ikoras-lab.github.io/KSP-RESCAL-Director/",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/1sfl48s/wip_resonant_orbit_calculator_with_mod_support/",
          lastUpdated: "8 Apr 2026",
          sourceCode: "https://github.com/IKoras-lab/KSP-RESCAL-Director",
        },
        {
          href: "https://walkermx.github.io/CommNetCalc/",
          thumb: "/comproj/cnc3.png",
          title: "CommNet Calculator",
          desc: "",
          author: "WalkerMx",
          lastUpdated: "2026",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/zp9qo4/so_i_made_a_tool_for_calculating_vessel/",
        },
        {
          href: "ryohpops.github.io/kspRemoteTechPlanner/",
          thumb: "/comproj/rtp.png",
          title: "Visual RemoteTech Planner for KSP",
          desc: "Plan your communication satellites network with graphical figures for the RemoteTech mod",
          author: "ryohpops",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/81294-web-visual-remotetech-planner-for-mod-remotetech/",
          lastUpdated: "2 Sep 2015",
          sourceCode: "https://github.com/ryohpops/kspRemoteTechPlanner",
        },
        {
          href: "https://grille.github.io/KerbalAntennaCalculator/",
          thumb: "/comproj/kac.png",
          title: "Kerbal Antenna Calculator",
          desc: "",
          author: "Grille",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/1f214q1/online_ksp_antenna_calculator/",
          sourceCode: "https://github.com/Grille/KerbalAntennaCalculator",
          lastUpdated: "26 Jan 2020",
        },

      ]
    },
    {
      title: "Miscellaneous",
      items: [
        {
          href: "https://alterbaron.github.io/ksp_aerocalc/",
          thumb: "/comproj/aerobrake.png",
          title: "Aerobraking Calculator",
          desc: "Calculates a maneuver to perform the intended aerobraking.",
          author: "alterbaron",
          sourceCode: "https://github.com/alterbaron/ksp_aerocalc",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/22681-updated-aerobraking-calculator/",
          lastUpdated: "20 Nov 2013"
        },
        {
          href: "https://mjungnickel18.github.io/korc/",
          thumb: "/comproj/orc.png",
          title: "Optimal Rocket Calculator",
          desc: "Generates a rocket design optimized for the given parameters.",
          author: "GaryCourt, MJungnickel",
          sourceCode: "https://github.com/mjungnickel18/korc/",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/ppzc10/ksp_optimal_rocket_calculator_update_to_stock_1122/",
          lastUpdated: "17 Sept 2021"
        },
        {
          href: "https://meithan.net/KSP/engines/",
          thumb: "/comproj/oec.png",
          title: "Optimal Engine Charts",
          desc: "Compute interactive optimal engine charts on demand",
          author: "Meithan",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/114995-web-111-optimal-engine-charts-interactive-webapp/",
          lastUpdated: "26 Apr 2016",
          sourceCode: "https://github.com/meithan/engine_charts"
        },
        {
          href: "http://www.kerbal-science.com/",
          thumb: "/comproj/rk.png",
          title: "Remaining Science",
          desc: "Reads save file and displays remaining science for all celestial objects and experiments in a large table.",
          author: "acalculus",
          lastUpdated: "5 May 2014"
        },
        {
          href: "http://files.arklyffe.com/orbcalc.html",
          thumb: "/comproj/orcalc.png",
          title: "Orbital Calculator",
          desc: "Browser-based orbital calculator",
          author: "cjameshuff",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/645-browser-based-orbit-calculator-updated-version-035/",
        },
        {
          href: "https://www.jacktex.eu/software/ksp_parachutes.php",
          thumb: "/comproj/kpc.png",
          title: "KSP Parachute Calculator",
          desc: "Estimates the velocity of your vessel after your drogue chutes are fully deployed as well as the touchdown speed with all your chutes fully deployed.",
          author: "jacktex"
        },
        {
          href: "https://jaschwartz.net/ksp_atm_entry/",
          thumb: "/comproj/aetc.png",
          title: "KSP Atmospheric Entry Timing Calculator",
          desc: "Calculates the time until atmospheric entry, max Q, and Mach 1. and periapsis distance.",
          author: "jaschwartz",
          sourceCode: "https://github.com/cfe316/ksp_atm_entry",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/102936-web-atmospheric-entry-amp-aerobraking-timing-calculator/",
        },
        {
          href: "https://fommil.com/kerbal/",
          thumb: "/comproj/kec.png",
          title: "Kerbal Engine Calculator",
          desc: "Calculator for working out what engine/tank/fuel combo one should take for various payloads.",
          author: "fommil",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/96968-web-calculator-for-enginesfuel/",
          sourceCode: "https://github.com/fommil/kerbal-calculator",
          lastUpdated: "13 Jun 2022",
        },
        {
          href: "https://goblin.github.io/ksp_brakecalc/brakecalc.html",
          thumb: "/comproj/tlc.png",
          title: "goblin's thruster landing calculator for KSP",
          desc: "This calculator will find the right time to fire your thrusters in order to estimate a safe landing.",
          author: "goblin",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/94539-web-thruster-landing-calculator/",
          lastUpdated: "2014"
        },
        {
          href: "https://brohlsoft.de/apps/ckan/",
          thumb: "",
          title: "CKAN Web View",
          desc: "view all entries from the main CKAN-repository in better-readable format than JSON",
          author: "Blauerdaemon",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/113023-ckan-web-view/",
        },
        {
          href: "https://kevinastock.github.io/rocketcalc/",
          thumb: "/comproj/rrc.png",
          title: "Reusable Rocket Calculator",
          desc: "",
          author: "Kevin Stock",
          sourceCode: "https://github.com/kevinastock/rocketcalc",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/79629-web0242-reusable-rocket-calculator/",
        }
      ]
    },
    {
      title: "Miscellaneaous (Spreadsheets)",
      items: [
        {
          title: "KSP TWR calc", thumb: "/comproj/e1.png",
          author: "ApplicationTrick552",
          desc: "Calculate the TWR for a craft and the resulting place of various stages",
          href: "https://docs.google.com/spreadsheets/d/10x0zlGlmQb8PAEcT59D8qNdLUiRlxtAcEhuNeBWVaqc",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/11cn4ns/ksp_2_accurate_twr_calculator/",
          lastUpdated: "2023"
        },
        {
          title: "ksp2 stage Thrust to Weight Ratio Calculator", thumb: "/comproj/e2.png",
          author: "AbbreviationsTrue585",
          desc: "Calculate the TWR for a craft and the resulting place of various stages",
          href: "https://docs.google.com/spreadsheets/d/10x0zlGlmQb8PAEcT59D8qNdLUiRlxtAcEhuNeBWVaqc",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/11cn4ns/ksp_2_accurate_twr_calculator/",
          lastUpdated: "2023"
        },
        {
          author: "lyoko9011", thumb: "/comproj/e3.png",
          title: "KSP Mining fuel, power, and heat calculator (From 1.11)",
          desc: "",
          href: "https://docs.google.com/spreadsheets/d/12RqPH91TbJ_gt0tkAYOAttNfLvNK0XFUJ8s7V1gJhwY",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/kl4lfz/a_spreadsheet_calculator_for_your_mining_needs/",
          lastUpdated: "2020",
        },
        {
          author: "LBoss9001",
          title: "KSP equal delta-v before and after node",
          desc: "Calculate how early you have to start your burn to hit exactly half of the delta v at the node",
          href: "https://desmos.com/calculator/ycuy5rtqrc",
          thumb: "/comproj/e4.png",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/1twu4h9/comment/oprdvy5/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button",
          lastUpdated: "5 Jun 2026",
        },
        {
          author: "6purplemoons",
          title: "Automatic Delta V Calculator",
          desc: "An automatic calculator that calculates delta V based on inputs, and therefore works with all planet packs",
          href: "https://docs.google.com/spreadsheets/d/14gtg6lq8NJNjt8XITQOLzj6SUkHreIioTvuz2ryk1iY",
          thumb: "/comproj/e4.png",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/228097-automatic-delta-v-calculator/",
          lastUpdated: "14 Jun 2025",

        },
        {
          author: "uraniumGallium",
          title: "KSP Umbral Shadow Interactive Visual",
          href: "https://www.desmos.com/calculator/zcpoapzwav",
          thumb: "/comproj/e6.png",
          desc: "Interactive visual in Desmos that calculates time, distance, and average speed while a craft is in a planet's shadow given a specified orbit.",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/gintl8/for_all_the_math_people_who_play_ksp_i_made_an/",
          lastUpdated: "2020"
        },
        {
          author: "uraniumGallium",
          title: "KSP Umbral Shadow Interactive Visual (Updated)",
          href: "https://www.desmos.com/calculator/pk2pvf3y3i",
          thumb: "/comproj/e7.png",
          desc: "Interactive visual in Desmos that calculates time, distance, and average speed while a craft is in a planet's shadow given a specified orbit.",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/obaqkc/for_all_the_math_people_who_play_ksp_i_made_a/",
          lastUpdated: "2021"
        },
        {
          href: "https://www.desmos.com/calculator/gi1mi2d3zz",
          thumb: "/comproj/e8.png",
          title: "KSP Suicide Burn Calculator",
          desc: "A very precise, but very useless tool to calculate sucide burn timing.",
          author: "u/PlanesAndRockets",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/dvhm1l/i_made_a_very_precise_but_very_useless_tool_to/",
          lastUpdated: "2019",
        },
        {
          href: "https://docs.google.com/spreadsheets/d/1mWFkAtILQbZg3Bj1u7WW_b6JMdtZoPqP4vZoolSx8rE",
          thumb: "/comproj/e9.png",
          title: "KSP inclined orbit - passes above the KSC",
          desc: "Calculate close approaches of my highly inclined spacecraft to the KSC, for rendezvousing",
          author: "u/Freak80MC",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/15vxjsj/i_made_a_spreadsheet_to_calculate_close/",
          lastUpdated: "20 Aug 2023"
        },
        {
          href: "https://docs.google.com/spreadsheets/d/1ZgMzOGcfmWKN3rX_Zj1gAAD-foc9HM-WuYigQ3hZWjo/",
          thumb: "/comproj/e10.png",
          title: "KSP Orbital Parameters",
          desc: "Compilation of all the parameters needed for trajectory calculations",
          author: "u/tachyon79",
          lastUpdated: "3 May 2020",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/gcibjj/i_just_got_ksp_and_was_surprised_i_couldnt_find/",
        },
        {
          href: "https://docs.google.com/spreadsheets/d/1vfZhjmMqSjzeeOQxEkiO4LsKG4Fc_htclPGKNOX0J1s",
          thumb: "/comproj/e11.png",
          title: "KSP Interstellar Beamed Power Calculator",
          desc: "",
          author: "u/Kielm",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/11zpweo/ksp_interstellar_beamed_power_calculator/",
        },
        {
          href: "https://colab.research.google.com/drive/1tpmdSALq3tUyqUruubZXa2djxsiwgk8p",
          thumb: "/comproj/fpa.png",
          title: "Planetary Alignment Time Calculator",
          desc: "Calculate how long until a planetary alignment occurs",
          author: "u/Cute_Particular_4918",
          redditPost: "https://www.reddit.com/r/KerbalSpaceProgram/comments/swrg9a/i_wrote_a_python_code_to_calculate_how_long_until/",
          lastUpdated: "2022",
        },
        {
          href: "https://docs.google.com/spreadsheets/d/1wtyd_xPI8djD7-E1jLdtOsxPwLhE2ku_zptRqJfLEfQ/edit?gid=0#gid=0",
          thumb: "/comproj/e12.png",
          title: "KSP RemoteTech Antenna Selector",
          desc: "This document allows you to view the antennas utilized by RemoteTech to aid you in the preparation for missions to specific bodies.",
          author: "Poodmund",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/147061-remotetech-antenna-selectorspreadsheet/",
        },
        {
          href: "https://www.geogebra.org/m/CekHeJRk",
          thumb: "/comproj/e13.png",
          title: "RemoteTech Communication Satellite Constellation Helper",
          desc: "Constellation helper for the Kerbal Space Program mod RemoteTech.",
          author: "DaMachinator",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/142703-webanyos-remotetech-constellation-builder-v02/",
        },
        {
          href: "https://docs.google.com/spreadsheets/d/1Uwapdg0oNEIiX0R0fUwqQvl5PhtOZ87KO-9Or6MIvGM",
          thumb: "/comproj/e14.png",
          title: "2021-05-03 - Personal - KSP Orbital Calculator",
          desc: "",
          author: "NASAHireMe",
          kspForum: "https://forum.kerbalspaceprogram.com/topic/92252-web-resonant-orbits-worksheet-and-orbital-calculator/",
          lastUpdated: "2014",
        },
        {
          href: "https://docs.google.com/spreadsheets/d/1yHS2LJJ6RAqb6gXNHwoaa8R9ZIqNtbe4ikbQ4e1dcUA",
          thumb: "/comproj/kbc.png",
          title: "Battery Calculator",
          desc: "Orbit Night/Darkness, Req. Battery Capacity, Satellite Relay Coverage",
          author: "Peppe",
          kspForum: "https://docs.google.com/spreadsheets/d/1yHS2LJJ6RAqb6gXNHwoaa8R9ZIqNtbe4ikbQ4e1dcUA/edit?gid=0#gid=0"

        }
      ]
    }





  ]



function CommunityProjectLink(props: {
  href: string,
  thumb: string,
  title: string,
  author: string,
  desc: string,
  lastUpdated?: string,
  kspForum?: string,
  redditPost?: string,
  sourceCode?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <Link
        href={props.href}
        target="_blank"
        className={cns.linkCard("flex gap-4 p-4 rounded-xl grow")}>
        <div className="size-18 sm:size-24 shrink-0 rounded-md overflow-hidden">
          <img src={props.thumb} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="leading-4 capitalize text-sm text-pretty">{props.title}<LucideArrowUpRight className="inline align-[-0rem] opacity-50" /></div>
          <div className="leading-4 text-sm opacity-75"><span className={cns.text.muted()}>by</span> {props.author}</div>
          <div className={cns.text.muted("text-xs leading-3.5")}>{props.desc}</div>
          {props.lastUpdated && <div className={cns.text.muted("text-xs opacity-50")}>Last Updated {props.lastUpdated}</div>}
        </div>
      </Link>
      <div className={cns.text.muted("flex gap-4 flex-wrap text-xs px-5")}>
        {props.kspForum && <Link href={props.kspForum} className={cns.text.link2()}>KSP Forum Post<LucideArrowUpRight className="inline align-[-0rem] opacity-50" /></Link>}
        {props.redditPost && <Link href={props.redditPost} className={cns.text.link2()}>Reddit Post<LucideArrowUpRight className="inline align-[-0rem] opacity-50" /></Link>}
        {props.sourceCode && <Link href={props.sourceCode} className={cns.text.link2()}>Source Code<LucideArrowUpRight className="inline align-[-0rem] opacity-50" /></Link>}
      </div>
    </div>
  )
}