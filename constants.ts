import { CardContent, StarContent, GiftContent, Mood } from './types';

export const MOODS: Mood[] = ['平静', '焦虑', '低落', '疲惫', '开心', '生气', '迷茫'];

export const NEEDS = ['需要建议', '需要被哄', '只想被陪着', '想睡个好觉'];

// subset of the 60+ cards (showing variety)
export const CARD_LIBRARY: CardContent[] = [
  { id: 'c01', title: 'The Hermit', tag: '冷静', mainText: '孤独不是被遗弃，而是拥有了完整的自己。', subText: '在这个时刻，外界的声音可以暂时静音。' },
  { id: 'c02', title: 'Pause', tag: '陪伴', mainText: '停下来并不意味着落后，只是为了确认方向。', subText: '呼吸，感受这一秒的存在。' },
  { id: 'c03', title: 'The Void', tag: '理性', mainText: '允许混乱存在，它是秩序重组的前奏。', subText: '不要急着去解决所有问题。' },
  { id: 'c04', title: 'Anchor', tag: '温柔', mainText: '你已经做得很好了，这不是安慰，是事实。', subText: '回头看看你已经走过的路。' },
  { id: 'c05', title: 'Silence', tag: '陪伴', mainText: '有些答案只有在绝对的安静中才会浮现。', subText: '闭上眼，听听内心的回响。' },
  { id: 'c06', title: 'Flow', tag: '鼓励', mainText: '顺其自然不是放弃抵抗，而是顺势而为。', subText: '像水一样，柔软但有力量。' },
  { id: 'c07', title: 'Night', tag: '温柔', mainText: '黑夜是用来修复伤口的，不是用来责备自己的。', subText: '把烦恼交给明天，现在只负责安睡。' },
  { id: 'c08', title: 'Mirror', tag: '理性', mainText: '你所厌恶的，也许是你压抑的一部分。', subText: '观察它，理解它，然后释放它。' },
  { id: 'c09', title: 'Distance', tag: '冷静', mainText: '保持距离是保护能量的一种方式。', subText: '你不必对所有期待负责。' },
  { id: 'c10', title: 'Seed', tag: '鼓励', mainText: '改变往往发生在看不见的土壤之下。', subText: '耐心点，时间会给出答案。' },
  { id: 'c11', title: 'Boundaries', tag: '理性', mainText: '拒绝并不冷漠，那是对自己最大的尊重。', subText: '你的能量很珍贵，不要随意消耗。' },
  { id: 'c12', title: 'Moon', tag: '温柔', mainText: '情绪像潮汐，有涨有落是自然的法则。', subText: '不要试图阻挡海浪，学会冲浪。' },
  { id: 'c13', title: 'Structure', tag: '理性', mainText: '如果你感到失控，试着整理一个抽屉。', subText: '外部的秩序有助于重建内心的秩序。' },
  { id: 'c14', title: 'Fog', tag: '陪伴', mainText: '看不清路的时候，就只看脚下这一步。', subText: '迷雾终将散去，不要惊慌。' },
  { id: 'c15', title: 'Fire', tag: '鼓励', mainText: '愤怒是一种燃料，如果你懂得如何转化它。', subText: '让它成为行动的动力，而不是毁灭的火焰。' },
  { id: 'c16', title: 'Ice', tag: '冷静', mainText: '冷静不是没有感情，而是不被感情吞噬。', subText: '站在旁观者的角度看这场风暴。' },
  { id: 'c17', title: 'Cycle', tag: '理性', mainText: '低谷是周期的一部分，它不是终点。', subText: '冬天之后，必定是春天。' },
  { id: 'c18', title: 'Gift', tag: '温柔', mainText: '无论今天发生了什么，感谢自己撑过来了。', subText: '给自己一个拥抱吧。' },
  { id: 'c19', title: 'Focus', tag: '理性', mainText: '一次只做一件事，一次只想一个问题。', subText: '专注是焦虑的解药。' },
  { id: 'c20', title: 'Space', tag: '陪伴', mainText: '给自己留一点空白，不要填满每分每秒。', subText: '无所事事也是一种重要的生活方式。' },
  // ... In a real app, populate to 60+
];

export const STAR_LIBRARY: StarContent[] = [
  { id: 's01', text: '宇宙接收到了你的信号。' },
  { id: 's02', text: '这件事已经过去了。' },
  { id: 's03', text: '你的感受是合理的。' },
  { id: 's04', text: '允许自己不完美。' },
  { id: 's05', text: '这一刻，你是安全的。' },
  { id: 's06', text: '星星在看着你。' },
  { id: 's07', text: '放下沉重，轻装前行。' },
  { id: 's08', text: '没什么大不了的。' },
  { id: 's09', text: '明天又是新的一天。' },
  { id: 's10', text: '你值得被温柔对待。' },
  { id: 's11', text: '深呼吸，慢慢来。' },
  { id: 's12', text: '你的存在本身就有意义。' },
  { id: 's13', text: '一切都会好起来的。' },
  { id: 's14', text: '接受无法改变的。' },
  { id: 's15', text: '你有力量面对一切。' },
  { id: 's16', text: '做最好的自己就好。' },
  { id: 's17', text: '不要苛求自己。' },
  { id: 's18', text: '即使微弱，也是光芒。' },
  { id: 's19', text: '这里永远接纳你。' },
  { id: 's20', text: '休息一下吧。' },
  // ... In a real app, populate to 100+
];

export const GIFT_LIBRARY: GiftContent[] = [
  { id: 'g01', type: 'story', text: '月亮问太阳：“你为什么总是那么耀眼？”太阳说：“因为我从不担心谁会看到我的黑子。”月亮笑了：“那我为什么总是有缺口？”太阳回答：“因为完美太无趣了，你需要留点空间装下星星。”' },
  { id: 'g02', type: 'joke', text: '今天去买生蚝，老板问要不要开，我说不开，我希望能和它有些交流。' },
  { id: 'g03', type: 'story', text: '有一只刺猬，它总是觉得自己太扎人了，所以躲在角落里。有一天，一只栗子滚了过来，轻轻碰了碰它。刺猬缩成一团：“别过来，我会扎伤你。”栗子笑了：“没关系，我皮厚。”' },
  { id: 'g04', type: 'joke', text: '如果你觉得自己很累，想一想细胞为了维持你的生命，每秒钟在进行成千上万次化学反应。它们都没喊累，你... 好吧，你也辛苦了。' },
  // ... populate to 50+
];
