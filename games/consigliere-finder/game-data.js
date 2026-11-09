export const candidates = [
  {
    id: "arturo",
    name: "Arturo “Playboy” Poparelli",
    hometown: "Queens, NY",
    weapon: "Glock 17 w/ silencer",
    strengths: "Slyness",
    weaknesses: "Lady problems",
    portrait: "assets/candidates/arturo.png",
    chat1: "Ugh… Starla was her name… the thighs on that woman could crush a watermelon… Anyways, word got out about us, and now her husband is tracking me down as we speak.",
    chat2: "Hey boss, thanks for moving me on to the next round. I was talking to this girl last night, and one thing led to another. Long story short, I stayed the night at her place and stole some money from her purse on my way out in the morning. It’s all yours!"
  },
  {
    id: "giovanni",
    name: "Giovanni “Gabagool” DeMarco",
    hometown: "Bayonne, NJ",
    weapon: "AK-47",
    strengths: "Strength/Loyalty",
    weaknesses: "Physical activity/Gabagool",
    portrait: "assets/candidates/giovanni.png",
    chat1: "Boss, you been to Jersey Mike’s recently? They did something to their gabagool; it tastes tremendous! If only their subs were bigger…",
    chat2: "To express my appreciation for your consideration of my being second-in-command, here’s one of the new hot honey gabagool subs from Jersey Mike's. It may or may not have a couple of bites taken out of it — I was kinda hungry on the drive here."
  },
  {
    id: "enzo",
    name: "Enzo “The Executioner” Colombo",
    hometown: "Hoboken, NJ",
    weapon: "Karambit knives",
    strengths: "Caring nature",
    weaknesses: "Caring nature",
    portrait: "assets/candidates/enzo.png",
    chat1: "Boss, between you and me… I named myself the executioner to seem tough. In reality, I’m a really chill guy, level-headed and a good decision-maker. I think a lot of our problems can be solved without bloodshed and instead, sometimes a hug!",
    chat2: "Sorry I was late — just broke up a fight between two of the capos. Thankfully, I calmed them down and they agreed to my compromise that conveniently puts 2 G’s a week into both of our pockets. You're welcome…"
  },
  {
    id: "ramon",
    name: "Ramon “Rage” Romano",
    hometown: "Rome, Italy",
    weapon: "Louisville Slugger",
    strengths: "Unstoppable killer",
    weaknesses: "English",
    portrait: "assets/candidates/ramon.png",
    chat1: "[Thick Italian accent] Boss, I no bad guy. Trust me and family will regain strong. Regain? Retain? Re… Baccala! Whatever…",
    chat2: "[Thick Italian accent] Boss, thanks moving me on. For this, I give you the head of your high school bully. It’s on ice in urinal."
  },
  {
    id: "carmine",
    name: "Carmine “C4” Marino",
    hometown: "Hackensack, NJ",
    weapon: "Explosives",
    strengths: "Decision-making/strategy",
    weaknesses: "Alcohol addiction",
    portrait: "assets/candidates/carmine.png",
    chat1: "Boss, what’s your favorite drink? Mine? Well, it depends… beer-wise, I like Pabst cuz it’s crisp and easy to drink. If I’m taking shots, it’s gotta be tequila; it wakes you right up! Mixed drinks are tough, but I’ll have to go with either a Moscow Mule or a Greyhound.",
    chat2: "[Slurred speech] I got a little uh um special prize for ya for moving me on hehe ha… Last week I blew up a safe and got some blue bills for ya. Here they are *BIRRRRPPP*…"
  },
  {
    id: "stevey",
    name: "Stevey “Knuckles” Cornelli",
    hometown: "Long Island, NY",
    weapon: "Brass knuckles",
    strengths: "Strength",
    weaknesses: "Intelligence",
    portrait: "assets/candidates/stevey.png",
    chat1: "You know what I’m always confused about: We’re always trying to get money, right? Why not just start printing our own? Would solve a lot of problems…",
    chat2: "Thanks for promoting me to Consigliere boss. I won’t let you down! Wait… you’re still doing chit chats… oh…"
  },
  {
    id: "bobby",
    name: "Bobby “The Builder” Beccorino",
    hometown: "East Rutherford, NJ",
    weapon: "Nailgun",
    strengths: "Blue-collar work ethic",
    weaknesses: "Can’t stop talking",
    portrait: "assets/candidates/bobby.png",
    chat1: "Ayeeee! Ohhhh! Name’s Bobby Beccorino from around the way. How’s it hangin? I’m a whole plate of pancakes pal, name’s Bobby Beccorino, you know, from around the way. Come over to the site where I do all my construction stuff, have you seen it? It’s around the way. Just hop in your car, drive down the road, and when you get to the way — go around it.",
    chat2: "Boss, remember me? Name’s Bobby Beccorino from around the way. People around the way are questioning why I moved on to the second round but I had to remind them: ‘Hey there, pal, Bobby Beccorino has been laying drywall since you were in diapers! Yeah, laying drywall instead of hanging it. That’s how much of a plate of pancakes I am, pal!’"
  }
];

export const candidateById = Object.fromEntries(candidates.map((candidate) => [candidate.id, candidate]));

export const openingCopy = "It’s New York City, 1988. You are a mob boss for the Gabagool crime family. As informants plague the ranks, loyal soldiers are being murdered, and more and more are put in the can each year, you have to find a new Consigliere, or second-in-command, to help you turn the family around.";

export const endings = {
  good: "Thanks for the promotion, boss. Now let’s get to work and make this city ours. But first… Gabagool!",
  hostile: "I can’t take your orders for another second. With the way you treat me, I should’ve done this a long time ago. Look who’s the boss now haha!"
};
