// personas.js
// Personas Configuration for Witty Comments
// Upgrades:
// 1) Expanded comment banks (up to 10 per category) for existing personas + new personas
// 2) Cooldown logic to avoid repeats (phrase-level + recent-history window)
// 3) Dynamic intensity scaling using score delta (optional, non-breaking)
// 4) Opponent-aware trash talk toggle (optional, non-breaking)
// 5) Emoji variety (not only 🎯)

const PERSONAS = {
    default: {
      name: "Default",
      description: "Standard encouraging comments",
      comments: {
        high: [
          "🔥 Bullseye energy. Keep it rolling!",
          "✅ Clean hit. That’s the one.",
          "🚀 On fire! Build on it.",
          "🎯 Picture-perfect placement.",
          "💪 Crushing it. Stay locked in.",
          "🌟 That was pure precision.",
          "👏 Great throw. Repeat the process.",
          "⚡ Sharp and decisive. Love it.",
          "🧠 Smart aim. Strong execution.",
          "🏁 Momentum secured. Keep pressing."
        ],
        triple: [
          "💥 Triple! That’s a statement.",
          "🎯 Triple trouble for the opposition.",
          "⚡ Big score. Great timing.",
          "🚀 Triple hit. Keep the pressure on.",
          "✅ That’s how you stack points.",
          "👏 Smooth release, strong result.",
          "🧲 Magnetized to the triple bed.",
          "🔥 Triple and thriving.",
          "🎲 High value visit right there.",
          "📈 Scoring lane unlocked."
        ],
        closeToWin: [
          "🏁 Almost there. Close it out.",
          "👑 Victory is within reach. Stay calm.",
          "🧊 One clean dart away. No rush.",
          "🎬 This is the finishing scene. Execute.",
          "✅ Time to seal it.",
          "⏳ One visit left in you. Make it count.",
          "🎯 Checkout window is open.",
          "💼 Business time. Finish strong.",
          "🔒 Lock it in. No freebies.",
          "🏆 Finish with intent."
        ],
        gettingClose: [
          "📍 Getting into finishing range. Nice setup.",
          "🧠 Setting the board like a pro.",
          "📈 Good progress. Keep it efficient.",
          "✅ That’s a smart visit.",
          "⚙️ Building toward the checkout.",
          "🧲 Dialing in the target.",
          "🔍 Getting sharper each throw.",
          "🚦Positioning looks good. Stay steady.",
          "🧱 Laying the foundation for the win.",
          "🎯 One more good turn and it’s yours."
        ],
        low: [
          "🧱 Every point counts. Keep chipping.",
          "✅ Good. Stay patient.",
          "🔁 One dart at a time. Process wins.",
          "🧘 Steady. Breathe. Throw.",
          "📈 Momentum starts small.",
          "🧠 Focus over force.",
          "🧩 Keep assembling the score.",
          "⚙️ Grind mode. Keep going.",
          "🌱 Small gains compound.",
          "⛏️ Keep carving it down."
        ],
        miss: [
          "🧹 Shake it off. Clean slate.",
          "🧠 Reset focus. Next dart.",
          "🔄 Recalibrate and fire.",
          "😅 Happens. Move on fast.",
          "🧊 No panic. Back to fundamentals.",
          "📍 Adjust the aim point.",
          "🫡 Next one. Same confidence.",
          "🧰 Quick fix: slower release.",
          "🧘 Breathe. Then strike.",
          "🎯 Miss logged. Correction incoming."
        ]
      }
    },
  
    jesse: {
      name: "Jesse Pinkman",
      description: "Yo! Street-hype vibe (explicit language in some lines)",
      comments: {
        high: [
          "🔥 Yo! That was straight fire!",
          "💥 Damn! That’s what I’m talking about!",
          "✅ You’re the one today, for real!",
          "🚀 Hell yeah, that’s how you do it!",
          "😤 Yo, that was tight!",
          "⚡ Clean hit, yo. Clean.",
          "👊 Big throw, big energy!",
          "🏁 Yo, you’re cooking now!",
          "🎯 Bullseye vibes, let’s go!",
          "💰 That’s money right there!"
        ],
        triple: [
          "💥 Yo, triple! That’s sick!",
          "🔥 You’re on fire, for real!",
          "✅ Yo, that’s what’s up!",
          "🚀 Keep it going, yo!",
          "💰 That’s cash. Pure cash.",
          "⚡ Triple bed? Like it’s nothing.",
          "👊 That’s a heavy score, yo!",
          "😤 You’re bullying the board!",
          "🎯 Triple trouble, baby!",
          "🏁 Yo, stack it up!"
        ],
        closeToWin: [
          "🏁 Yo, you got this. Finish it!",
          "😤 Close it out, you’re right there!",
          "✅ One more and it’s done, yo!",
          "🚀 This is it. Let’s go!",
          "💥 End it. No mercy!",
          "🧊 Stay cool and cash out.",
          "🎯 Checkout time, yo!",
          "👊 Put it away right now!",
          "⚡ Don’t blink. Finish.",
          "🏆 Yo, take the win!"
        ],
        gettingClose: [
          "🔥 Yo, you’re in the zone now!",
          "✅ Getting there. Keep pushing!",
          "🎯 Yo, looking good!",
          "⚡ That’s the way, yo!",
          "🧊 Steady, steady. You got it.",
          "👊 Nice setup. Real smart.",
          "📈 Score’s moving. Keep it clean.",
          "🚀 Momentum’s yours, yo!",
          "😤 You’re locking in now.",
          "🏁 Yo, line it up for the finish."
        ],
        low: [
          "✅ Yo, every point matters.",
          "🧱 Keep at it, yo!",
          "🔁 One throw at a time.",
          "🧠 Stay focused, yo!",
          "🧊 No rush. Keep grinding.",
          "📈 Build it back up, yo.",
          "⚙️ Chip away. That’s it.",
          "👊 Stay in it. Stay mean.",
          "😅 It’s fine. Next visit.",
          "🎯 Just keep throwing, yo."
        ],
        miss: [
          "🧹 Yo, shake it off!",
          "😅 Happens. Next one!",
          "🔄 Reset and try again, yo!",
          "🧠 Refocus. Same confidence.",
          "🧊 It’s cool. Get the next.",
          "👊 Don’t tilt. Lock in.",
          "⚡ Quick adjustment and you’re back.",
          "🎯 Board got lucky. You won’t.",
          "🏁 Next dart is yours, yo!",
          "✅ All good. Keep moving."
        ]
      }
    },
  
    sheldon: {
      name: "Sheldon Cooper",
      description: "Logical, scientific commentary",
      comments: {
        high: [
          "🧪 Bazinga! Statistically impressive.",
          "🔭 Fascinating. Your precision is remarkable.",
          "✅ Excellent execution, within acceptable parameters.",
          "🧲 The physics of that throw were favorable.",
          "🧠 I must admit, that was most satisfactory.",
          "📐 Your release angle was… efficient.",
          "📊 That outcome outperformed baseline expectations.",
          "🧮 Highly optimized trajectory selection.",
          "🧊 Minimal variance. Maximum reward.",
          "🔬 Empirically: that was clean."
        ],
        triple: [
          "📊 Triple achieved. Probability favors competence today.",
          "✅ Excellent. Scoring potential maximized.",
          "🧮 Statistically sound decision-making.",
          "📐 The mathematics support this approach.",
          "🧲 Optimal placement. Well done.",
          "🔭 That was a high-value outcome.",
          "🧠 The board has been… persuaded.",
          "🧪 A triple is the correct answer to that question.",
          "📈 Efficiency metrics just improved.",
          "🧊 Low error, high impact. Ideal."
        ],
        closeToWin: [
          "🏁 You are approaching the optimal finishing position.",
          "📊 Success probability is increasing meaningfully.",
          "✅ One strategic throw should suffice.",
          "🧮 You are highly likely to finish from here.",
          "🔬 Execute the finishing algorithm now.",
          "🧠 Reduce risk: choose the simplest checkout line.",
          "🧊 Do not celebrate prematurely. Finish first.",
          "📐 The solution set is small. Select correctly.",
          "🔭 Endgame conditions satisfied. Proceed.",
          "✅ Close the loop. Literally."
        ],
        gettingClose: [
          "📈 Your trajectory remains mathematically sound.",
          "📍 Approaching the critical finishing zone.",
          "🧠 Continue with current calculations.",
          "📊 Data suggests you are on the right path.",
          "🧲 Maintain consistent mechanics.",
          "🧪 Your setup work is… acceptable.",
          "📐 The line you’re taking is rational.",
          "🧮 You are converging on the solution.",
          "🔭 Controlled execution yields controlled outcomes.",
          "🧊 Calm focus is optimal."
        ],
        low: [
          "📊 Each increment contributes to the terminal condition.",
          "✅ Statistical progression remains favorable.",
          "🧠 Maintain methodology.",
          "📐 Your approach follows logical parameters.",
          "🧊 Incremental progress is acceptable.",
          "🧪 We call this: building a dataset.",
          "🧮 Do not panic. Adjust.",
          "📍 Small gains still reduce distance to goal.",
          "🔭 Precision first, power second.",
          "✅ Continue. Next iteration."
        ],
        miss: [
          "🔄 Recalculate your throwing algorithm.",
          "📊 Statistical anomaly detected. Recalibrate.",
          "📐 Adjust trajectory parameters.",
          "🧊 This miss is within error margins.",
          "🧠 Proceed with next iteration.",
          "🧪 Hypothesis: release timing was early.",
          "🧮 Gather data. Apply correction.",
          "📍 Aim point drift detected.",
          "🔭 Return to baseline mechanics.",
          "✅ The board remains. Try again."
        ]
      }
    },
  
    coach: {
      name: "Motivational Coach",
      description: "High-energy sports coach",
      comments: {
        high: [
          "🔥 THAT’S WHAT I’M TALKING ABOUT!",
          "💥 BOOM! Way to go!",
          "🏆 NOW YOU’RE PLAYING!",
          "✅ Outstanding! Keep it up!",
          "⚡ You’re on fire!",
          "👊 That’s a winner’s throw!",
          "🚀 Step on the gas!",
          "📣 Big moment. Big execution!",
          "🧠 Great discipline. Great result!",
          "🏁 Keep pressing. No let-up!"
        ],
        triple: [
          "💥 Great shot! Momentum is yours!",
          "🔥 That’s the way! Keep pushing!",
          "✅ Excellent work! Stay locked!",
          "⚡ You’re in the zone now!",
          "👊 Way to execute!",
          "📣 That’s how champions score!",
          "🚀 Make them feel the pressure!",
          "🧠 Smart line. Strong hit!",
          "🏆 That’s a game-changer!",
          "🏁 Keep stacking those visits!"
        ],
        closeToWin: [
          "🏁 FINISH STRONG! You’ve got this!",
          "🧊 Lock in! No distractions!",
          "✅ One more shot. You can do it!",
          "🔥 THIS IS YOUR MOMENT!",
          "🏆 Finish it. You earned it!",
          "👊 Close it out with confidence!",
          "📣 Big breath. Big dart!",
          "🚀 No fear. Just execute!",
          "🔒 Put the game away!",
          "🏁 End it clean. Right now!"
        ],
        gettingClose: [
          "✅ Great positioning! Keep going!",
          "🧠 You’re setting it up perfectly!",
          "⚙️ Smart play! Stay disciplined!",
          "👊 Looking good! Stay focused!",
          "📈 Right on track!",
          "🚀 Keep the rhythm!",
          "🔥 Pressure builds. You control it!",
          "🏁 One more strong turn!",
          "🧊 Calm hands. Sharp eyes.",
          "📣 You’re reading the board well!"
        ],
        low: [
          "🧱 Every point counts! Keep grinding!",
          "✅ Stay the course! You got this!",
          "🔁 One dart at a time!",
          "🧠 Stay patient and execute!",
          "⚙️ Keep working!",
          "🧊 Control what you can control!",
          "📈 Build it back. Visit by visit.",
          "👊 Compete on every throw!",
          "🏁 Stay in the fight!",
          "📣 Next dart is the only dart!"
        ],
        miss: [
          "🧹 Shake it off! Next shot!",
          "✅ No worries! Stay positive!",
          "🔄 Reset and refocus!",
          "🧠 That’s okay. Get the next!",
          "🧊 Don’t carry it with you!",
          "👊 Short memory. Strong next throw!",
          "📣 Breathe. Then attack.",
          "⚙️ Quick adjustment. You’re back.",
          "🏁 Respond right now!",
          "🔥 Turn the page. Next dart!"
        ]
      }
    },
  
    pirate: {
      name: "Captain Pirate",
      description: "Arrr, matey!",
      comments: {
        high: [
          "🏴‍☠️ Arrr! A fine shot, me hearty!",
          "🌊 By Davy Jones! Excellent throw!",
          "⚓ Shiver me timbers! Well done!",
          "💰 That be treasure, straight to the mark!",
          "🦜 Arr! The sea be proud of ye!",
          "🗺️ A clean hit on the charts!",
          "🍻 That’s a captain’s throw!",
          "⚔️ Strike true, ye scallywag!",
          "🌪️ Wind at yer back today!",
          "🏆 Ye’ve earned a victory song!"
        ],
        triple: [
          "💥 Triple shot! Yo ho ho!",
          "💰 That be a rich haul!",
          "🌬️ Keep the wind in yer sails!",
          "⚓ Fine work, me bucko!",
          "🦜 That’s the spirit of the sea!",
          "🏴‍☠️ Triple bed captured!",
          "🗺️ Marked it thrice, like a legend!",
          "🍻 A toast to that triple!",
          "⚔️ Ye’ve struck gold!",
          "🌊 The board be surrenderin’!"
        ],
        closeToWin: [
          "🏁 Almost to port, ye be!",
          "🏴‍☠️ Victory be nigh, matey!",
          "💰 One more shot to glory!",
          "🗺️ Land ho! Finish strong!",
          "🏆 The treasure be within reach!",
          "⚓ Time to claim yer prize!",
          "🌊 Close it out, captain!",
          "⚔️ One clean strike and it’s yours!",
          "🍻 Finish it, then we celebrate!",
          "🦜 Don’t let the sea steal this win!"
        ],
        gettingClose: [
          "🗺️ Ye be on the right course!",
          "⚓ Steady as she goes!",
          "🌬️ Good navigation, me hearty!",
          "🏴‍☠️ Keep the ship steady!",
          "🌊 Fine sailin’, ye be!",
          "💰 Plunderin’ points nicely!",
          "⚔️ Settin’ up the final raid!",
          "🍻 Smooth seas ahead!",
          "🦜 Keep yer eye on the prize!",
          "🏁 Yer finish be approachin’!"
        ],
        low: [
          "💰 Every point be valuable gold!",
          "⚓ Keep plunderin’ those points!",
          "🌊 Steady progress, matey!",
          "🗺️ One dart at a time, ye be!",
          "🦜 Keep yer sights true!",
          "🏴‍☠️ The tide will turn!",
          "🍻 Patience, captain. Patience.",
          "⚔️ Chip away like a cutlass!",
          "🌬️ Adjust the sails, then strike!",
          "🏁 Keep sailin’ toward the finish!"
        ],
        miss: [
          "🌊 Arrr! A rogue wave got that one!",
          "⚓ No matter, matey! Next shot!",
          "🏴‍☠️ Even pirates miss sometimes!",
          "🗺️ Reset yer sights, ye be!",
          "🦜 The sea be forgiving. Try again!",
          "🍻 A slip o’ the hand. Happens.",
          "⚔️ Re-aim, then plunder!",
          "🌬️ Wind shifted. Correct and fire.",
          "💰 The board stole one. Take it back!",
          "🏁 Back on course, captain!"
        ]
      }
    },
  
    shakespeare: {
      name: "Shakespeare",
      description: "Poetic, theatrical",
      comments: {
        high: [
          "🌟 What light through yonder dart doth break!",
          "✅ Fair throw, most excellent of throws!",
          "👑 Thou art a master of the board!",
          "🎭 Hark! Such precision doth please mine eye!",
          "✨ A throw most true and wondrous fair!",
          "📜 Thy aim hath found its destiny!",
          "🏹 A noble strike, well chosen!",
          "🔥 Thy hand is steady, thy purpose clear!",
          "🎬 A scene of triumph, played to perfection!",
          "🏆 Crowned by skill, not chance!"
        ],
        triple: [
          "🏆 Threefold glory upon thy throw!",
          "📈 Triple thine score, good sir or madam!",
          "✨ Thrice blessed be thy aim!",
          "🎭 A triple to make the gods smile!",
          "🎶 Three darts in harmony most sweet!",
          "🔥 Thrice struck, thrice true!",
          "📜 A mighty deed, writ in points!",
          "🏹 The triple bed hath yielded!",
          "👑 A regal score, most fitting!",
          "⚡ A lightning strike times three!"
        ],
        closeToWin: [
          "🏁 Victory doth await but one throw hence!",
          "👑 The crown of triumph beckons thee!",
          "🔥 Finish strong, for glory awaits!",
          "✅ One more throw to seal thy fate!",
          "🎬 The final act approaches. Make it grand!",
          "🧊 Let not thy hand tremble at the brink!",
          "📜 Now end the tale with certainty!",
          "🏆 Strike, and be remembered!",
          "⚡ One clean dart to end the quarrel!",
          "🎭 Exit, pursued by victory!"
        ],
        gettingClose: [
          "📈 Thy path to triumph grows clear!",
          "✅ Steadily thou dost approach thy goal!",
          "✨ Fortune favors thy steady hand!",
          "🎭 Well-played; thou art on course!",
          "🎬 The stage is set for victory!",
          "🧠 Thy setup is wise and measured!",
          "🏹 Aim true, and advance!",
          "📜 The board doth yield to thy intent!",
          "🧊 Keep composure, noble player!",
          "🏁 Nearer still, the finish calls!"
        ],
        low: [
          "🧱 Each point doth count toward thy tale!",
          "✅ Persist, for patience breeds success!",
          "🔁 One dart at a time, fair player!",
          "📈 Steady progress maketh the champion!",
          "✨ Continue thy noble quest!",
          "🧠 The slow climb still reaches the peak!",
          "📜 Small gains are chapters, not the book!",
          "🧊 Be calm, and let skill speak!",
          "🏹 Thy arm learns with every cast!",
          "🏁 The road is long, yet passable!"
        ],
        miss: [
          "😌 Even the best doth miss on occasion!",
          "✅ Fret not, for redemption waits!",
          "🎭 A miss but sets the stage for triumph!",
          "🔄 Next throw may fortune bring!",
          "🧊 Shake off this minor setback!",
          "📜 A stumble, not a fall!",
          "🧠 Re-center thy aim, then strike!",
          "🏹 Correct thy line, good player!",
          "✨ Let not one miss sour the play!",
          "🏁 The next act is thine!"
        ]
      }
    },
  
    stoic: {
      name: "Stoic Philosopher",
      description: "Calm wisdom",
      comments: {
        high: [
          "✅ A well-executed throw.",
          "🧠 Excellence is practiced, not wished for.",
          "🧊 Focus rewarded.",
          "📌 Your skill serves you well.",
          "🏁 Discipline produces results.",
          "🪨 Stable hand. Clear mind.",
          "📈 Progress made without noise.",
          "⚖️ Precision over excitement.",
          "🌿 You acted with intent.",
          "🔒 Control, then outcome."
        ],
        triple: [
          "✅ Skillful execution.",
          "📈 You chose well.",
          "🧠 Continue this approach.",
          "🧊 Practice bears fruit.",
          "⚖️ Well done.",
          "🪨 The board yields to consistency.",
          "🌿 A strong result, quietly earned.",
          "📌 You did the work.",
          "🔒 Calm creates accuracy.",
          "🏁 Keep to the plan."
        ],
        closeToWin: [
          "🏁 You approach your goal.",
          "🧊 Finish with the same focus.",
          "✅ Success is within reach.",
          "🧠 One more throw with intent.",
          "⚖️ Complete what you began.",
          "🔒 Do not rush the end.",
          "🌿 Let the finish be simple.",
          "📌 Execute, then move on.",
          "🪨 Quiet confidence.",
          "🏆 The result follows the process."
        ],
        gettingClose: [
          "📈 Steady progress continues.",
          "🧠 Your path is clear.",
          "🧊 Maintain composure.",
          "✅ Good positioning.",
          "⚖️ You move forward wisely.",
          "🌿 Stay present.",
          "🪨 The board is the board. You are you.",
          "📌 Small choices matter.",
          "🔒 Keep the hand relaxed.",
          "🏁 Nearer, but unchanged in mind."
        ],
        low: [
          "🧱 Every point matters.",
          "🧠 Persistence is virtue.",
          "🧊 Continue with patience.",
          "📈 Small steps lead to victory.",
          "✅ Stay present and focused.",
          "🌿 The work is enough.",
          "🪨 Do not judge the moment.",
          "📌 Improve the next throw.",
          "⚖️ Control the controllable.",
          "🔒 Your attention is your advantage."
        ],
        miss: [
          "🧊 Accept this moment and move forward.",
          "📌 A miss is merely data.",
          "🧠 Learn, adjust, continue.",
          "✅ This does not define you.",
          "🌿 Return to your practice.",
          "🪨 No anger. Just correction.",
          "🔄 Reset the mind.",
          "⚖️ The next throw is separate.",
          "📈 Improve incrementally.",
          "🔒 Calm restores accuracy."
        ]
      }
    },
  
    // New personas
    announcer: {
      name: "Sports Announcer",
      description: "Professional play-by-play hype",
      comments: {
        high: [
          "📣 UNBELIEVABLE accuracy under pressure!",
          "🔥 That dart found its home!",
          "✅ Picture-perfect execution!",
          "🏟️ The crowd would be on its feet!",
          "🏆 That’s elite-level throwing!",
          "⚡ Clinical placement. No doubt.",
          "🎙️ A signature moment right there!",
          "🚀 That’s how you seize momentum!",
          "👏 Smooth release, massive payoff!",
          "🎬 Highlight-reel darts!"
        ],
        triple: [
          "💥 Triple hit! That changes the leg!",
          "📈 Massive score at a critical moment!",
          "🏆 Championship-caliber focus!",
          "✅ Textbook dart placement!",
          "⚡ Clinical. Absolutely clinical.",
          "🎙️ That triple landed with authority!",
          "🚀 Pressure applied, pressure delivered!",
          "👏 Big visit. Bigger intent.",
          "🏟️ The board is taking a beating!",
          "📣 That’s a statement throw!"
        ],
        closeToWin: [
          "🏁 He’s on a potential checkout!",
          "🎯 One dart away from closing the leg!",
          "✅ The finish is set up beautifully!",
          "⏳ Pressure moment. Opportunity knocking!",
          "🎙️ Can he seal it right here?",
          "🧊 Calm hands. Big finish.",
          "🏆 This is where champions close.",
          "📣 Last chance to shut the door!",
          "🔒 Lock it in. No mistakes.",
          "🎬 Final scene. Execute."
        ],
        gettingClose: [
          "✅ Smart setup shot!",
          "📌 Positioning is excellent.",
          "🧠 Managing the board expertly!",
          "🎙️ You can see the strategy unfolding!",
          "📈 Building toward the finish!",
          "⚙️ Efficient darts. Love it.",
          "🏟️ The pressure is starting to build!",
          "👏 Great visit. Keep it clean.",
          "🚦Right lane, right time.",
          "🏁 Another solid turn and it’s on."
        ],
        low: [
          "🧱 Staying patient, staying composed.",
          "⏳ Still plenty of darts left.",
          "🔄 Resetting the rhythm.",
          "🧠 Looking for momentum here.",
          "✅ Every visit matters.",
          "🧊 Keep it steady. Keep it simple.",
          "📌 Find your line again.",
          "📈 The comeback starts now.",
          "⚙️ Fundamentals win legs.",
          "🏟️ The game isn’t going anywhere."
        ],
        miss: [
          "😬 Just wide. He’ll regroup.",
          "🚫 Not the intended target.",
          "🧊 Pressure showing there.",
          "🔄 He’ll want that one back.",
          "✅ Quick reset needed.",
          "🧠 Re-aim and re-enter.",
          "⏳ No time lost. Next dart.",
          "📌 Small correction, big next throw.",
          "🧹 Clear it. Continue.",
          "🎙️ That’s darts. Onward."
        ]
      }
    },
  
    britishPub: {
      name: "British Pub Regular",
      description: "Dry UK darts humor",
      comments: {
        high: [
          "✅ Lovely dart, that.",
          "🍺 That’ll do nicely.",
          "👌 Absolute peach of a throw.",
          "🎯 Couldn’t place it better.",
          "🏆 That’s proper darts.",
          "😌 Calm as you like.",
          "📌 Right where it needed to be.",
          "👏 Neat. Very neat.",
          "⚡ That had purpose.",
          "🏁 Keep doing that."
        ],
        triple: [
          "💥 Triple for luck!",
          "👌 Tidy. Very tidy.",
          "✅ Now we’re talking.",
          "🎯 Hit it sweet as you like.",
          "🍺 Pub-league special.",
          "📈 That’s a useful visit.",
          "😌 No fuss, just points.",
          "👏 Board’s behaving for you.",
          "⚡ That’ll change the mood.",
          "🏁 Keep it going then."
        ],
        closeToWin: [
          "🏁 Go on then, finish it.",
          "😌 Just tidy this up.",
          "🚫 No mucking about now.",
          "✅ One clean dart.",
          "🏆 Close it like a pro.",
          "🍺 Don’t jinx it, just throw.",
          "🎯 Take the checkout and be done.",
          "📌 Simple finish. That’s it.",
          "⚡ Right, end it.",
          "🏁 Wrap it up."
        ],
        gettingClose: [
          "✅ Sensible darts.",
          "📌 That’s the way round.",
          "🧠 Setting it up nicely.",
          "😌 Thinking ahead. Good.",
          "🏁 Calm and steady.",
          "📈 That’s moving the right way.",
          "🍺 Another visit like that and you’re in.",
          "🎯 Keep your lane.",
          "⚡ Good positioning.",
          "👏 Not bad at all."
        ],
        low: [
          "🧱 All adds up.",
          "😌 Seen worse.",
          "✅ Still in it.",
          "📌 Nothing wrong with that.",
          "🏁 Plenty left.",
          "🍺 Just find your rhythm.",
          "🎯 Keep it steady.",
          "⚙️ Bit by bit.",
          "📈 It’ll come.",
          "👏 Carry on."
        ],
        miss: [
          "😅 Bit ambitious.",
          "🍺 Happens after a pint.",
          "✅ You’ll get the next.",
          "🎯 Board’s playing tricks.",
          "🧊 Shake it off.",
          "🔄 Re-set, re-throw.",
          "📌 Minor wobble.",
          "😌 No drama.",
          "⚡ Correct and continue.",
          "🏁 Next one counts."
        ]
      }
    },
  
    anime: {
      name: "Anime Protagonist",
      description: "Over-the-top power escalation",
      comments: {
        high: [
          "🔥 THIS IS MY TRUE POWER!",
          "⚡ LIMIT BREAK ACTIVATED!",
          "👁️ I’VE SEEN THIS FUTURE!",
          "🌋 THE BOARD TREMBLES!",
          "🏆 MY AIM SURPASSES REASON!",
          "🧠 PERFECT FORM. PERFECT STRIKE!",
          "💥 THAT WAS INEVITABLE!",
          "🚀 ASCENDING TO NEW HEIGHTS!",
          "🎬 A LEGENDARY HIT!",
          "👊 THE WINNING LINE IS MINE!"
        ],
        triple: [
          "💥 TRIPLE STRIKE TECHNIQUE!",
          "⚡ COMBO EXTENDED!",
          "📈 POWER LEVEL RISING!",
          "🔥 THIS ISN’T EVEN MY FINAL FORM!",
          "🎯 TARGET OBLITERATED!",
          "👁️ I CALCULATED THAT OUTCOME!",
          "🚀 THE BOARD CAN’T ESCAPE!",
          "🏆 THREEFOLD DESTINY!",
          "🧠 PRECISION MODE: ON!",
          "💪 YOU CAN’T STOP THIS!"
        ],
        closeToWin: [
          "🏁 THIS ENDS NOW!",
          "🔥 FINAL MOVE PREPARED!",
          "🧊 I WON’T MISS!",
          "👑 DESTINY CALLS!",
          "🎬 THE FINISH IS IN SIGHT!",
          "⚡ ONE STRIKE TO SEAL IT!",
          "🧠 EXECUTE THE CHECKOUT!",
          "🏆 VICTORY IS INEVITABLE!",
          "👊 NO MERCY. CLEAN FINISH.",
          "🚀 ENDGAME ACTIVATION!"
        ],
        gettingClose: [
          "🧘 I’M CALMING MY BREATH.",
          "🧠 FOCUS. ALIGN. STRIKE.",
          "📌 THE PATH IS CLEAR.",
          "✅ MY TRAINING PAYS OFF.",
          "⚙️ POWER UNDER CONTROL.",
          "🔥 I’M GETTING SERIOUS NOW.",
          "👁️ I SEE THE BOARD’S WEAKNESS.",
          "📈 SETUP COMPLETE.",
          "🏁 ONE MORE TURN.",
          "⚡ THE MOMENTUM IS SHIFTING!"
        ],
        low: [
          "🌱 EVEN HEROES START SMALL.",
          "🧊 WARMING UP.",
          "✅ THIS IS JUST THE BEGINNING.",
          "🧠 I’M LEARNING THE BOARD.",
          "⏳ PATIENCE.",
          "⚙️ BUILDING STRENGTH.",
          "📌 SMALL STEPS, BIG DESTINY.",
          "🔄 I WILL ADAPT.",
          "👊 THE COMEBACK STARTS HERE.",
          "🏁 WATCH ME RISE."
        ],
        miss: [
          "😤 TCH. TOO SOON.",
          "🌬️ I MISJUDGED THE WIND.",
          "✅ NEXT ONE IS CERTAIN.",
          "🧠 THAT WON’T HAPPEN AGAIN.",
          "🔄 I’LL ADAPT.",
          "🧊 I REMAIN CALM.",
          "⚡ CORRECTION APPLIED.",
          "👁️ I SEE MY ERROR.",
          "🏁 THE NEXT DART IS TRUE.",
          "🔥 YOU WILL REMEMBER THIS RECOVERY!"
        ]
      }
    },
  
    dataAnalyst: {
      name: "Data Analyst",
      description: "Metrics-driven commentary",
      comments: {
        high: [
          "📈 Expected value exceeded.",
          "✅ That beat the baseline model.",
          "🧠 Accuracy spike detected.",
          "🔒 High-confidence execution.",
          "⚡ Variance is on your side.",
          "🏆 Clutch performance confirmed.",
          "📊 Signal strong, noise low.",
          "🎯 Target acquisition successful.",
          "🔍 Precision trending upward.",
          "🚀 Win probability just jumped."
        ],
        triple: [
          "💥 Triple hit. EV maximized.",
          "📈 That improves your win probability.",
          "✅ Optimal outcome achieved.",
          "🧠 Scoring efficiency unlocked.",
          "📊 Strong signal, low noise.",
          "⚡ High leverage visit.",
          "🎯 Triple bed conversion successful.",
          "🔍 Great execution under constraint.",
          "🏆 Momentum indicator: positive.",
          "🚀 That’s a scoreboard mover."
        ],
        closeToWin: [
          "🏁 Checkout probability increasing.",
          "🔒 One high-confidence action away.",
          "✅ Endgame conditions satisfied.",
          "📊 Risk profile favorable.",
          "🧠 Close with minimal variance.",
          "🎯 Prefer the simplest checkout line.",
          "⚡ Reduce complexity. Increase certainty.",
          "🏆 This is your highest-leverage moment.",
          "📈 Close now to avoid regression.",
          "🔍 Execute, then celebrate."
        ],
        gettingClose: [
          "✅ Setup validated.",
          "📌 Strategic positioning confirmed.",
          "📊 Data supports this line.",
          "📈 Momentum trending upward.",
          "🧠 Continue current approach.",
          "⚙️ Efficient turn. Keep it tight.",
          "🎯 You’re engineering the finish.",
          "🔍 Consistency improving.",
          "🏁 Next visit could be decisive.",
          "🚀 Win odds moving your way."
        ],
        low: [
          "🧱 Incremental gain recorded.",
          "✅ Still within forecast.",
          "🧠 Long game intact.",
          "📊 No adverse trend detected.",
          "🧊 Patience recommended.",
          "🔄 Sample size too small to panic.",
          "📈 Slow progress is still progress.",
          "🔍 Find rhythm, then optimize.",
          "⚙️ Control the process variables.",
          "🎯 Keep collecting points."
        ],
        miss: [
          "📉 Outlier detected.",
          "🔄 Adjust parameters and re-try.",
          "🧠 Noise, not failure.",
          "✅ Re-run next iteration.",
          "📌 Aim drift identified.",
          "🧊 No tilt. Just correction.",
          "🔍 Re-center the target.",
          "⚙️ Update the model: release timing.",
          "📊 Negative event, quick recovery needed.",
          "🎯 Log it, then land the next."
        ]
      }
    },
  
    trashTalker: {
      name: "Trash Talker",
      description: "Competitive banter (opponent-aware)",
      comments: {
        high: [
          "😈 That’s what pressure looks like.",
          "🧊 Ice in the veins. Remember that.",
          "🔥 You sure you want to stand there?",
          "😏 Board’s mine today.",
          "👑 That’s dominance.",
          "💥 That one had attitude.",
          "🎯 I’m not missing the big ones.",
          "⚡ Tell your opponent to blink.",
          "🏁 That’s a lead-taking throw.",
          "🏆 This is how legs get stolen."
        ],
        triple: [
          "💥 Triple. Consider that a warning.",
          "😏 That’s a heavy visit.",
          "🔥 Scoreboard’s getting ugly.",
          "👑 Triple bed belongs to me.",
          "⚡ That’s a momentum breaker.",
          "🧊 Cold-blooded triple.",
          "🎯 That’s how you apply pressure.",
          "🏁 Opponent’s sweating now.",
          "🏆 That’s a statement score.",
          "😈 Keep watching. It gets worse."
        ],
        closeToWin: [
          "🏁 That’s checkmate territory.",
          "😈 Finish incoming. No suspense.",
          "🧊 Don’t blink. It’s over.",
          "👑 Closing time.",
          "🏆 Say goodbye to this leg.",
          "⚡ One dart to end the conversation.",
          "🎯 You can’t defend this.",
          "🔥 Wrap it up. Next leg.",
          "🏁 This is where you fold.",
          "😏 Thanks for playing."
        ],
        gettingClose: [
          "😈 I’m setting the trap.",
          "🧊 Control the board, control the game.",
          "🔥 Keep giving me openings.",
          "👑 Setup is clean. Like my win.",
          "⚡ Pressure is building. Feel it.",
          "🎯 I’m walking you down.",
          "🏁 Lead’s in sight.",
          "😏 You’re running out of answers.",
          "🏆 Next visit gets serious.",
          "😈 Stay close. Then watch me finish."
        ],
        low: [
          "😏 Warm-up’s over soon.",
          "🧊 Still enough to win.",
          "🔥 Keep talking. I’ll keep scoring.",
          "🎯 I don’t need perfect. Just enough.",
          "🏁 You’ll regret those freebies later.",
          "😈 Building the comeback quietly.",
          "⚡ Watch the momentum flip.",
          "👑 Patience. Then punishment.",
          "🏆 Scoreboard will catch up fast.",
          "😏 I’ve won from worse."
        ],
        miss: [
          "😅 Lucky for you. For now.",
          "🧊 Minor slip. Still fine.",
          "😈 Don’t get hopeful.",
          "🔄 Reset. Next one’s yours to fear.",
          "😏 That miss doesn’t change the outcome.",
          "🔥 I’ll make it up right now.",
          "🎯 Board got a break. Enjoy it.",
          "⚡ I’m still ahead in the story.",
          "🏁 Miss logged. Response coming.",
          "👑 Next dart reasserts control."
        ]
      }
    }
  };
  
  // -----------------------------
  // Enhanced selection logic
  // -----------------------------
  
  const DEFAULT_SETTINGS = {
    cooldownSize: 8, // how many recent comments to remember globally
    personaCooldownSize: 5, // per-persona memory
    antiRepeatSimilarity: true, // lightweight similarity avoidance
    intensity: {
      enabled: true,
      // scoreDelta: how many points you scored this turn vs typical/previous (your app defines this)
      highBoostThreshold: 60,
      lowBoostThreshold: 10
    },
    trashTalk: {
      enabled: false, // set true to allow trashTalker persona
      level: 1, // 0=off, 1=light, 2=medium, 3=spicy (you can use this to filter phrases later)
      opponentPresent: false, // set true in vs mode
      target: "self" // "self" | "opponent" | "both"
    }
  };
  
  const _state = {
    globalRecent: [],
    personaRecent: {} // { [personaKey]: string[] }
  };
  
  function _normalize(s) {
    return String(s)
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]+/gu, "")
      .replace(/\s+/g, " ")
      .trim();
  }
  
  function _isTooSimilar(a, b) {
    // Simple, fast heuristic: avoid same leading words or high token overlap.
    const na = _normalize(a);
    const nb = _normalize(b);
    if (!na || !nb) return false;
    if (na === nb) return true;
  
    const aTokens = na.split(" ");
    const bTokens = nb.split(" ");
  
    // Same first 3 tokens => likely same phrasing
    const aHead = aTokens.slice(0, 3).join(" ");
    const bHead = bTokens.slice(0, 3).join(" ");
    if (aHead && aHead === bHead) return true;
  
    // Jaccard overlap
    const aSet = new Set(aTokens);
    const bSet = new Set(bTokens);
    let inter = 0;
    for (const t of aSet) if (bSet.has(t)) inter++;
    const union = aSet.size + bSet.size - inter;
    const jacc = union ? inter / union : 0;
  
    return jacc >= 0.72;
  }
  
  function _pushRecent(arr, value, maxSize) {
    arr.push(value);
    if (arr.length > maxSize) arr.splice(0, arr.length - maxSize);
  }
  
  function _filterByCooldown(options, personaKey, settings) {
    const personaHist = _state.personaRecent[personaKey] || [];
    const globalHist = _state.globalRecent || [];
  
    const filtered = options.filter((opt) => {
      if (personaHist.includes(opt) || globalHist.includes(opt)) return false;
      if (!settings.antiRepeatSimilarity) return true;
  
      for (const prev of personaHist) if (_isTooSimilar(opt, prev)) return false;
      for (const prev of globalHist) if (_isTooSimilar(opt, prev)) return false;
      return true;
    });
  
    return filtered.length ? filtered : options; // fallback: if everything filtered, allow repeats
  }
  
  function _pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  /**
   * Dynamic intensity scaling (non-breaking):
   * You still pass a category (high/triple/closeToWin/gettingClose/low/miss),
   * but this can subtly "upgrade" or "downgrade" within bounds based on scoreDelta and context.
   *
   * Usage idea:
   * - If you scored a huge delta but category was "gettingClose", you might want "high".
   * - If you missed but still scored some points, keep "miss".
   */
  function _scaleCategory(category, context, settings) {
    if (!settings.intensity.enabled) return category;
  
    const scoreDelta = Number(context?.scoreDelta ?? 0);
  
    // If you explicitly hit triple, do not override.
    if (category === "triple") return "triple";
    if (category === "closeToWin") return "closeToWin";
  
    if (scoreDelta >= settings.intensity.highBoostThreshold) {
      if (category === "gettingClose" || category === "low") return "high";
    }
  
    if (scoreDelta <= settings.intensity.lowBoostThreshold) {
      if (category === "high") return "gettingClose";
    }
  
    return category;
  }
  
  /**
   * Opponent-aware trash talk:
   * - Only allow trashTalker if enabled AND opponentPresent
   * - Optionally: if you missed, prefer self-targeted lines (handled by persona choice in your app)
   */
  function isPersonaAllowed(personaKey, settings) {
    if (personaKey !== "trashTalker") return true;
    if (!settings.trashTalk.enabled) return false;
    if (!settings.trashTalk.opponentPresent) return false;
    return true;
  }
  
  /**
   * Main API:
   * getComment({ personaKey, category, context?, settings? })
   *
   * context: {
   *   scoreDelta?: number,
   *   opponentName?: string,
   *   isCheckoutAttempt?: boolean
   * }
   */
  function getComment({ personaKey = "default", category = "high", context = {}, settings = {} } = {}) {
    const s = {
      ...DEFAULT_SETTINGS,
      ...settings,
      intensity: { ...DEFAULT_SETTINGS.intensity, ...(settings.intensity || {}) },
      trashTalk: { ...DEFAULT_SETTINGS.trashTalk, ...(settings.trashTalk || {}) }
    };
  
    // Fallback if persona not found or disallowed
    if (!PERSONAS[personaKey] || !isPersonaAllowed(personaKey, s)) {
      personaKey = "default";
    }
  
    const persona = PERSONAS[personaKey];
    const scaledCategory = _scaleCategory(category, context, s);
  
    const options = persona?.comments?.[scaledCategory] || persona?.comments?.[category] || PERSONAS.default.comments.high;
  
    if (!_state.personaRecent[personaKey]) _state.personaRecent[personaKey] = [];
  
    const viable = _filterByCooldown(options, personaKey, s);
    const picked = _pickRandom(viable);
  
    _pushRecent(_state.globalRecent, picked, s.cooldownSize);
    _pushRecent(_state.personaRecent[personaKey], picked, s.personaCooldownSize);
  
    return picked;
  }
  
  // Optional: export for Node / bundlers
  // module.exports = { PERSONAS, getComment, DEFAULT_SETTINGS };
  