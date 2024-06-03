"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.usage = exports.inject = exports.name = void 0;
const fs = require('node:fs');
const url_1 = require("node:url");
const koishi_1 = require("koishi");
const path_1 = require("node:path");
const crypto_1 = require("node:crypto");
const promises_1 = require("node:fs/promises");
const logger = new koishi_1.Logger('emojihub-bili');
exports.inject = {
  optional: ['canvas']
};
exports.usage = `
<h2><a href="https://www.npmjs.com/package/koishi-plugin-emojihub-bili">如何额外添加自己喜欢的表情包</a></h2>
<p>添加额外的表情包到 <strong>EmojiHub-bili</strong> 中非常简单！只需按照以下步骤操作：</p>
<ol>
  <li><strong>安装扩展</strong>：<br>在 Edge 浏览器中添加扩展：<a href="https://greasyfork.org/zh-CN/scripts/456497-bilibili%E4%B8%93%E6%A0%8F%E5%8E%9F%E5%9B%BE%E9%93%BE%E6%8E%A5%E6%8F%90%E5%8F%96">（点击右侧文字查看）Bilibili专栏原图链接提取</a>。</li>
  <li><strong>搜索表情包</strong>：<br>开启扩展后，打开<a href="https://search.bilibili.com/article/">哔哩哔哩专栏搜索（https://search.bilibili.com/article/）</a>，在专栏中搜索您需要的表情包。</li>
  <li><strong>提取链接</strong>：<br>点击进入具体的某个专栏帖子，屏幕靠近右下角会有一个绿色的【提取链接】按钮。点击该按钮，即可下载包含当前专栏所有图片的 URL 的 txt 文件。</li>
  <li><strong>配置 EmojiHub-bili</strong>：<br>将同一类表情包图片的 URL 整合到同一个 txt 文件中。然后，在 Koishi 的配置项中填入相应的指令名称与 txt 文件路径。</li>
  <li><strong>保存并重载</strong>：<br>完成配置后，保存您的配置并重载插件，您就可以使用自定义的指令发送表情包啦！🌟📚</li>
  <p> </p>

  <h2>温馨提示：</h2>
  <p><br>请勿将自定义的txt文件与本插件放置在同一目录下，以免插件更新 导致文件丢失。</p>
  <p>目前EmojiHub-bili默认提供<code>35套</code>表情包。若您的配置内容有误差，请点击<code>MoreEmojiHub</code>表格右上角按钮内的<code>恢复默认值</code>。</p>
  <p>若开启插件后，指令不出现，<a href="/market?keyword=commands">请重新开关commands插件</a></p>
</ol>
`;
const defaultMoreEmojiHub = [
  { command: '随机emojihub表情包', source_url: '注意!请勿修改此处内容。左边的指令可以修改。此项内容严禁填写TXT文件的路径。' },  // 下面实际有效为 35套
  { command: '本地图库示例', source_url: path_1.join(__dirname, 'txts') },
  { command: '2233娘小剧场表情包', source_url: path_1.join(__dirname, 'txts/2233娘小剧场.txt') },
  { command: 'acomu414表情包', source_url: path_1.join(__dirname, 'txts/acomu414.txt') },
  { command: 'ba表情包', source_url: path_1.join(__dirname, 'txts/ba.txt') },
  { command: 'capoo表情包', source_url: path_1.join(__dirname, 'txts/capoo.txt') },
  { command: 'chiikawa表情包', source_url: path_1.join(__dirname, 'txts/chiikawa.txt') },
  { command: 'downvote表情包', source_url: path_1.join(__dirname, 'txts/Downvote.txt') },
  { command: 'doro表情包', source_url: path_1.join(__dirname, 'txts/doro.txt') },
  { command: 'eveonecat表情包', source_url: path_1.join(__dirname, 'txts/eveonecat.txt') },
  { command: 'fufu表情包', source_url: path_1.join(__dirname, 'txts/fufu.txt') },
  { command: 'kemomimi表情包', source_url: path_1.join(__dirname, 'txts/kemomimi酱表情包.txt') },
  { command: 'koishi-meme表情包', source_url: path_1.join(__dirname, 'txts/koimeme.txt') },  
  { command: 'mygo表情包', source_url: path_1.join(__dirname, 'txts/mygo.txt') },
  { command: 'seseren表情包', source_url: path_1.join(__dirname, 'txts/seseren.txt') },
  { command: '阿夸表情包', source_url: path_1.join(__dirname, 'txts/阿夸.txt') },
  { command: '阿尼亚表情包', source_url: path_1.join(__dirname, 'txts/阿尼亚.txt') },
  { command: '白圣女表情包', source_url: path_1.join(__dirname, 'txts/白圣女.txt') },
  { command: '白圣女漫画表情包', source_url: path_1.join(__dirname, 'txts/白圣女黑白.txt') },
  { command: '柴郡表情包', source_url: path_1.join(__dirname, 'txts/柴郡.txt') },
  { command: '甘城猫猫表情包', source_url: path_1.join(__dirname, 'txts/甘城猫猫.txt') },
  { command: '孤独摇滚表情包', source_url: path_1.join(__dirname, 'txts/孤独摇滚.txt') },
  { command: '狗妈表情包', source_url: path_1.join(__dirname, 'txts/狗妈.txt') },
  { command: '滑稽表情包', source_url: path_1.join(__dirname, 'txts/滑稽.txt') },
  { command: '疾旋鼬表情包', source_url: path_1.join(__dirname, 'txts/疾旋鼬.txt') },
  { command: '流萤表情包', source_url: path_1.join(__dirname, 'txts/流萤.txt') },
  { command: '龙图表情包', source_url: path_1.join(__dirname, 'txts/龙图.txt') },
  { command: '蜜汁工坊表情包', source_url: path_1.join(__dirname, 'txts/蜜汁工坊.txt') },
  { command: '男娘武器库表情包', source_url: path_1.join(__dirname, 'txts/男娘武器库.txt') },
  { command: '千恋万花表情包', source_url: path_1.join(__dirname, 'txts/0721.txt') },
  { command: '赛马娘表情包', source_url: path_1.join(__dirname, 'txts/赛马娘.txt') },
  { command: '小黑子表情包', source_url: path_1.join(__dirname, 'txts/小黑子.txt') },
  { command: '心海表情包', source_url: path_1.join(__dirname, 'txts/心海.txt') },
  { command: '绪山真寻表情包', source_url: path_1.join(__dirname, 'txts/绪山真寻.txt') },
  { command: '亚托莉表情包', source_url: path_1.join(__dirname, 'txts/亚托莉表情包.txt') },
  { command: '永雏小菲表情包', source_url: path_1.join(__dirname, 'txts/永雏小菲.txt') },
  { command: '宇佐紀表情包', source_url: path_1.join(__dirname, 'txts/宇佐紀.txt') },
  // { command: '', source_url: path_1.join(__dirname, 'txts/.txt') },
  // 以后添加其他的命令...未完待续
];

exports.Config = koishi_1.Schema.intersect([  
koishi_1.Schema.object({  
  autoEmoji: koishi_1.Schema.boolean().description("进阶设置总开关。打开后，开启自动表情包功能 `达到一定消息数量 自动触发表情包`").default(false),
  count: koishi_1.Schema.number().default(30).description('触发自动表情包的消息数量的阈值。`不建议过低`'),
  triggerprobability: koishi_1.Schema.percent().default(0.6).description('达到消息数量阈值时，发送表情包的概率 `范围为 0 到 1 `'),

  groupListmapping: koishi_1.Schema.array(koishi_1.Schema.object({
    groupList: koishi_1.Schema.string().description('开启自动表情包的群组ID').pattern(/^\S+$/),
    defaultemojicommand: koishi_1.Schema.string().description('表情包指令名称 `应与下方指令表格对应`'),
    enable: koishi_1.Schema.boolean().description('勾选后 屏蔽该群 的自动表情包'),
  })).role('table').description('表情包指令映射 `注意群组ID不要多空格什么的`')
  .default([
  { groupList: '114514', defaultemojicommand: 'koishi-meme，白圣女表情包，男娘武器库', enable: false},
  { groupList: '1919810', defaultemojicommand: '随机emojihub表情包', enable: true}, 
  ]),

  allgroupautoEmoji: koishi_1.Schema.boolean().description("`全部群组` 开启自动表情包").default(false),

  allgroupemojicommand: koishi_1.Schema.string().role('textarea', { rows: [2, 4] }).description('`全部群组的` 表情包指令映射`一行一个指令 或者 逗号分隔`   <br> 可以同时在`groupListmapping`指定群组的表情包内容')
  .default( `宇佐紀表情包\n白圣女表情包\n白圣女漫画表情包` ),

}).description('进阶设置'),

// Alin---ba-plugin 配置项
koishi_1.Schema.object({
  MDswitch: koishi_1.Schema.boolean().description("`总开关，开启后`QQ官方配置项才生效").default(false),
  markdown_setting: koishi_1.Schema.object({
      
      mdid: koishi_1.Schema.string().description('QQ官方bot 的 MarkDown模板ID').pattern(/^\d+_\d+$/),

      zllbmdtext_1: koishi_1.Schema.string().default('text1').description('`指令列表MD`.`MD参数`MD文字参数--1'),
      zllbmdtext_2: koishi_1.Schema.string().default('text2').description('`指令列表MD`.`MD参数`MD文字参数--2'),
      zllbtext_1: koishi_1.Schema.array(String).default(["表情包列表","emoji表情列表","表情列表："]).description('`指令列表MD`MD显示文字内容--1`每次从下列随机选一个发送`').role('table'),
      zllbtext_2: koishi_1.Schema.array(String).default(["点击按钮即可触发哦~","😻列表如下：点击按钮触发哦！","点击即可查看对应表情哦！😽"]).description('`指令列表MD`MD显示文字内容--2`每次从下列随机选一个发送`').role('table'),

      zlmdtext_1: koishi_1.Schema.string().default('text1').description('`指令MD`.`MD参数`MD文字参数--1'),
      zlmdtext_2: koishi_1.Schema.string().default('text2').description('`指令MD`.`MD参数`MD文字参数--2'),
      zltext_1: koishi_1.Schema.array(String).default(["emoji~😺","表情包！","这是您的表情包~"]).description('`指令MD`MD显示文字内容--1`每次从下列随机选一个发送`').role('table'),
      zltext_2: koishi_1.Schema.array(String).default(["邦邦咔邦！","😺😺😺","😽来了哦！"]).description('`指令MD`MD显示文字内容--2`每次从下列随机选一个发送`').role('table'),

      zlmdp_1: koishi_1.Schema.string().default('img').description('`指令MD`.`MD参数`MD图片参数--1 `不需要设定图片宽高`'),
      zlmdp_2: koishi_1.Schema.string().default('url').description('`指令MD`.`MD参数`MD图片参数--2'),

      ButtonText1: koishi_1.Schema.string().default('再来一张😺').description('`指令MD`按钮上`再来一张功能`显示的文字'),
      ButtonText2: koishi_1.Schema.string().default('返回列表😽').description('`指令MD`按钮上`返回列表功能`显示的文字'),

      MinimumBoundary: koishi_1.Schema.number().default(200).description('`指令MD`过小图片的界限，宽或者高小于这个值就会自动放大到`Magnifymultiple`'),
      Magnifymultiple: koishi_1.Schema.number().default(1000).description('`指令MD`对于过小图片（宽/高小于`MinimumBoundary`）的放大目标的标准，默认放大到1000px'),
  }).collapse().description('实现QQ官方bot `再来一张`和`返回列表`的按钮效果，需要`canvas`服务。<br> [适用本插件的QQ官方bot MD示例模版 可点击这里参考](https://www.npmjs.com/package/koishi-plugin-emojihub-bili)'),

  QQPicToChannelUrl: koishi_1.Schema.boolean().description("`开启后` 本地图片通过频道URL作为群聊MD的图片链接`须填写下方的 QQchannelId`").experimental().default(false),

  QQchannelId: koishi_1.Schema.string().description('`填入QQ频道的频道ID`，将该ID的频道作为中转频道 <br> 频道ID可以用[inspect插件来查看](/market?keyword=inspect) `频道ID应为纯数字`').experimental().pattern(/^\S+$/),

}).description('QQ官方bot设置'),

koishi_1.Schema.object({
  deleteMsg: koishi_1.Schema.boolean().description("`开启后`自动撤回表情").default(false),
  deleteMsgtime: koishi_1.Schema.number().default(30).description('若干`秒`后 撤回表情'),

  emojihub_bili_command: koishi_1.Schema.string().default('emojihub-bili').description('`父级指令`的指令名称').pattern(/^\S+$/),

  MoreEmojiHub: koishi_1.Schema.array(koishi_1.Schema.object({
    command: koishi_1.Schema.string().description('注册的指令名称'),
    source_url: koishi_1.Schema.string().description('表情包文件地址'),   
  })).role('table').description('表情包指令映射 当前默认`35套`txt文件`点击右方按钮 可以恢复到默认值`').default(defaultMoreEmojiHub)

}).description('表情包设置'),

 
koishi_1.Schema.object({
  //LocalSendNetworkPictures: koishi_1.Schema.boolean().description("`开启后` 将网络URL下载至本地，作为本地图片发送").experimental().default(false),
  LocalSendNetworkPicturesList: koishi_1.Schema.string().role('textarea', { rows: [2, 4] }).description('将`下列指令`对应的内容下载至本地，作为本地图片发送').default().experimental(),
  deletePictime: koishi_1.Schema.number().default(10).description('若干`秒`后 删除下载的本地临时文件').experimental(),

  localPicToBase64: koishi_1.Schema.boolean().description("`开启后`本地图片以base64发出 `日常使用无需开启，且不建议官方bot使用`").experimental().default(false),

  consoleinfo: koishi_1.Schema.boolean().default(false).description("日志调试模式`日常使用无需开启`"),
}).description('调试选项'),
koishi_1.Schema.union([
  koishi_1.Schema.object({
    consoleinfo: koishi_1.Schema.const(true).required(),
    allfileinfo: koishi_1.Schema.boolean().description("输出allfile调试内容`MoreEmojiHub 列表详细内容`")
  }),
  koishi_1.Schema.object({})
])

])


/**
 * 刷新机器人的令牌并上传图片到指定频道
 * @param ctx 
 * @param data - 图片数据或者文件路径
 * @param appId - 机器人AppID
 * @param secret - 机器人Secret
 * @param channelId - 频道ID
 * @returns {Promise<{ url: string }>} - 上传图片后的URL
 */
async function uploadImageToChannel(ctx, consoleinfo, data, appId, secret, channelId) {

  async function refreshToken(bot) {
      const { access_token: accessToken, expires_in: expiresIn } = await ctx.http.post('https://bots.qq.com/app/getAppAccessToken', {
          appId: bot.appId,
          clientSecret: bot.secret
      });
      bot.token = accessToken;
      ctx.setTimeout(() => refreshToken(bot), (expiresIn - 30) * 1000);
  }

  // 临时的bot对象
  const bot = { appId, secret, channelId };

  // 刷新令牌
  await refreshToken(bot);

  // 处理图片数据
  if (typeof data === 'string') {
      if (new URL(data).protocol === 'file:') {
          data = await promises_1.readFile(url_1.fileURLToPath(data));
      } else {
          data = await ctx.http.get(data, { responseType: 'arraybuffer' });
          data = Buffer.from(data);
      }
  }

  const payload = new FormData();
  payload.append('msg_id', '0');
  payload.append('file_image', new Blob([data], { type: 'image/png' }), 'image.jpg');

  await ctx.http.post(`https://api.sgroup.qq.com/channels/${bot.channelId}/messages`, payload, {
      headers: {
          Authorization: `QQBot ${bot.token}`,
          'X-Union-Appid': bot.appId
      }
  });

  // 计算MD5并返回图片URL
  const md5 = crypto_1.createHash('md5').update(data).digest('hex').toUpperCase();
  if (channelId !== undefined && consoleinfo) {
    logger.info(`使用本地图片*QQ频道  发送URL为： https://gchat.qpic.cn/qmeetpic/0/0-0-${md5}/0`)
    };
  return { url: `https://gchat.qpic.cn/qmeetpic/0/0-0-${md5}/0` };
}

async function getImageAsBase64(imagePath) {
  try {
      const imageBuffer = fs.readFileSync(imagePath);
      // 将图片 buffer 转换为 Base64 字符串
      const base64String = imageBuffer.toString('base64');
      return base64String;
  } catch (error) {
      logger.error('Error converting image to base64:', error);
      return null;
  }
}

/**
 * 发送列表按钮
 * @param session 
 * @param command_list 指令数组，类型为字符串 
 * @returns 
 */
function command_list_markdown(session, command_list, config) {
    const mdid = config.markdown_setting.mdid;
    let zllbmdtext_1 = config.markdown_setting.zllbmdtext_1;
    let zllbmdtext_2 = config.markdown_setting.zllbmdtext_2;

    const zllbtext_1_options = config.markdown_setting.zllbtext_1;
    const zllbtext_2_options = config.markdown_setting.zllbtext_2;
    
    const zllbtext_1 = zllbtext_1_options[Math.floor(Math.random() * zllbtext_1_options.length)];
    const zllbtext_2 = zllbtext_2_options[Math.floor(Math.random() * zllbtext_2_options.length)];

    const l1 = []
    const l2 = []
    const l3 = []
    const l4 = []
    const l5 = []
    const l6 = []
    const alllist = [l1, l2, l3, l4, l5, l6]
    // 遍历x中的每个元素，平均分配到arrays中的每个数组
    let cindex = 0; // 当前数组的索引
    let itemCount = 0; // 当前数组已接收的元素数量
    for (let i = 0; i < command_list.length; i++) {
        alllist[cindex].push(
            {
                render_data: { label: command_list[i], style: 1 },
                action: {
                    type: 2, // 指令按钮
                    permission: { type: 2 }, // 所有人可点击
                    data: `/${command_list[i]}`, // 点击后发送
                    enter: true, // 若 false 则填入输入框
                },
            }
        );
        itemCount++;
        if (itemCount === 4) {
            // 移动到下一个数组
            cindex++;
            // 重置元素计数器
            itemCount = 0;
            // 如果已经是最后一个数组，则从头开始
            if (cindex === alllist.length) {
                cindex = 0;
            }
        }
    }

    return {
        msg_type: 2,
        msg_id: session.messageId,
        markdown: {
            custom_template_id: mdid,//mdid
            params: [
              {
                  key: zllbmdtext_1,
                  values: [zllbtext_1],//这是第一段文字
              },
              {
                  key: zllbmdtext_2,
                  values: [zllbtext_2],//这是第二段文字
              },
          ]
      },
        keyboard: {
            content: {
                rows: [
                    {
                        buttons: l1,
                    },
                    {
                        buttons: l2,
                    },
                    {
                        buttons: l3,
                    },
                    {
                        buttons: l4,
                    },                  
                    {
                        buttons: l5,
                    },               
                ],
            },
        },
    }
}

async function determineImagePath(txtPath, config, channelId, command , ctx) {
  // 随机一个表情包
  if (!path_1.isAbsolute(txtPath) && !txtPath.includes('.txt')) {
    // 从配置中筛选出所有绝对路径
    const allAbsolutePaths = config.MoreEmojiHub.filter(emoji => path_1.isAbsolute(emoji.source_url)).map(emoji => emoji.source_url);
    if (allAbsolutePaths.length > 0) {
      txtPath = allAbsolutePaths[Math.floor(Math.random() * allAbsolutePaths.length)];
    } else {
      // 如果没有有效的绝对路径，则返回null
      return null;
    }
  }
  return await getRandomImageUrlFromFile(txtPath, config, channelId, command, ctx);  //不是随机表情包，直接使用txtPath就行
}

async function downloadImage(url, outputPath, ctx) {
  try {
      const response = await ctx.http.get(url, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response);  
      await fs.promises.writeFile(outputPath, buffer);
      return outputPath;
  } catch (error) {
      logger.error(`下载图片失败: ${error.message}`);
      throw error; 
  }
}

async function getRandomImageUrlFromFile(txtPath, config, channelId, command, ctx) {
  let urls, imageUrl, isLocal = false;
    if (!txtPath.includes(".txt")) {  //本地文件夹发图
      // 检查路径是否为绝对路径且不以 .txt 结尾
      if (!fs.existsSync(txtPath)) {
        logger.error(`错误:路径不存在： ${txtPath}`);
        return { imageUrl: null, isLocal: false };
      }
      const files = fs.readdirSync(txtPath).filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.bmp') || file.endsWith('.webp'));
      if (files.length === 0) {
          logger.error("文件夹中未找到有效图片文件（jpg,png,gif,webp,bmp）");
          return { imageUrl: null, isLocal: false };
      }
      imageUrl = path_1.join(txtPath, files[Math.floor(Math.random() * files.length)]);
      isLocal = true; 
      if (channelId !== undefined && config.consoleinfo) {
        if (config.deleteMsg && config.deleteMsgtime > 0) {
          logger.info(`已开启撤回功能\n在`+ config.deleteMsgtime+ `秒后自动撤回`);  
          }
          logger.info(`使用指令： ` + command );
          logger.info(`\n ${channelId} 触发表情包\n使用文件夹 ${txtPath}\n发送本地图片为 ${imageUrl}`);
      }
      return { imageUrl: imageUrl, isLocal: true };
  }
  try {
      urls = fs.readFileSync(txtPath, 'utf8').split('\n').filter(url => url.trim() !== ''); // 过滤空行
  } catch (error) {
      if (error instanceof Error && error.code === 'ENOENT') {
          return { imageUrl: null, isLocal: false };
      } else {
          logger.error(error);
          return { imageUrl: null, isLocal: false };
      }
  }



  // 检查是否有有效的URL
  if (urls.length === 0) {
    logger.info(`错误！无有效URL可用：${txtPath}`);
    return { imageUrl: null, isLocal: false };
  }

  // 随机选择URL
  const index = Math.floor(Math.random() * urls.length);
  let txtUrl = urls[index].trim();

  // 没有前缀 "https://" ，添加前缀
  if (!txtUrl.startsWith("https://") && !txtUrl.startsWith("http://")) {
    const koishiPrefix = "https://koishi-meme.itzdrli.com/meme/"; 
    const bilibiliPrefix = "https://i0.hdslb.com/bfs/";   
    const prefix = txtPath.includes("koimeme.txt") ? koishiPrefix : bilibiliPrefix;    
    txtUrl = prefix + txtUrl; 
  }

  // 移除多余的前缀 （双前缀情况，由 README 说明的浏览器脚本的 模式二 产生，需要兼容，这在用户自定义的txt里比较重要）
  const extraPrefix = 'https:';
  const bilibiliPrefix = "https://i0.hdslb.com/bfs/";
  if (txtUrl.startsWith(extraPrefix + bilibiliPrefix)) {
      txtUrl = txtUrl.replace(extraPrefix, '');
  }

  imageUrl = txtUrl.trim();

  // 将这些指令下载至本地，进行本地发图的逻辑
  // 一般用于QQ官方bot，可以解决 在使用未备案的链接，来发送MarkDown的时候，图片不显示的问题
  if (config.LocalSendNetworkPicturesList && config.LocalSendNetworkPicturesList.length > 0) {
    // 记录日志
    if (channelId !== undefined && config.consoleinfo) {
      const regex = /[^\\/]+\.txt$/;
      const match = regex.exec(txtPath);
      const fileName = match ? match[0] : '未知文件'; 
      if (config.allfileinfo) {          
          logger.info(`allFiles： \n` + config.MoreEmojiHub.filter(emoji => path_1.isAbsolute(emoji.source_url)).map(emoji => emoji.source_url));
      }
      if (config.deleteMsg && config.deleteMsgtime > 0) {
          logger.info(`已开启撤回功能\n在`+ config.deleteMsgtime+ `秒后自动撤回`);
      }      
      logger.info(`\n${channelId} 触发表情包\n使用指令： ${command}\n使用文件 ${fileName}\n发送URL为 ${imageUrl}`);
    } 

    const normalizedList = config.LocalSendNetworkPicturesList.split(/\n|,|，/).map(item => item.trim().toLowerCase());
    const lowerCaseCommand = command.toLowerCase(); 
    if (normalizedList.includes(lowerCaseCommand)) { // 如果配置了需要下载到本地
        const outputPath = path_1.join(__dirname, `${Date.now()}.png`); // 临时文件
        try {
            imageUrl = await downloadImage(txtUrl, outputPath, ctx);
            isLocal = true;
            // 定时删除
            setTimeout(() => {
                fs.unlinkSync(imageUrl);            
                if (config.consoleinfo) {                      
                  logger.info(`临时文件已删除：${imageUrl}`);  
                }            
            }, config.deletePictime * 1000);
            return { imageUrl: imageUrl, isLocal: true };
        } catch (downloadError) {
            logger.error(`图片下载失败：${downloadError.message}`);
            return { imageUrl: null, isLocal: false };
        }
    }
  }


  // 记录日志
  if (channelId !== undefined && config.consoleinfo) {
      const regex = /[^\\/]+\.txt$/;
      const match = regex.exec(txtPath);
      const fileName = match ? match[0] : '未知文件'; 
      if (config.allfileinfo) {          
          logger.info(`allFiles： \n` + config.MoreEmojiHub.filter(emoji => path_1.isAbsolute(emoji.source_url)).map(emoji => emoji.source_url));
      }
      if (config.deleteMsg && config.deleteMsgtime > 0) {
          logger.info(`已开启撤回功能\n在`+ config.deleteMsgtime+ `秒后自动撤回`);
      }      
      logger.info(`\n${channelId} 触发表情包\n使用指令： ${command}\n使用文件 ${fileName}\n发送URL为 ${imageUrl}`);
  }

  return { imageUrl: imageUrl, isLocal: false };

}

/**
* 列出所有表情包指令名称。
* @param config 配置对象，包含 MoreEmojiHub 数组
* @returns {string[]} 所有表情包指令的列表
*/
function listAllCommands(config) {
  // 使用 map 方法来提取每个表情包的指令名称
  const allCommands = config.MoreEmojiHub.map(emoji => emoji.command);

  // 检查结果是否为空
  if (allCommands.length === 0) {
      logger.error("未找到任何表情包指令。");
  }

  // 返回命令列表
  return allCommands;
}

function apply(ctx, config) {
  const emojihub_bili_codecommand = config.emojihub_bili_command;
  function applyI18n(emojihub_bili_codecommand) {
    const applyI18nresult = {
        commands: {
            [emojihub_bili_codecommand]: {
                description: `${emojihub_bili_codecommand}表情包功能`,
                messages: {
                    "notfound_txt": "ERROR！找不到文件或文件为空！指令：",
                    "List_of_emojis": "表情包列表："
                }
            }
        }
    };
    //logger.error(applyI18nresult)
    return  applyI18nresult;
}
var zh_CN_default  = applyI18n(emojihub_bili_codecommand)
ctx.i18n.define("zh-CN", zh_CN_default);

/**
 * 发送md
 * @param session 
 * @param command 用户输入的指令
 * @param imageUrl 图片的链接，带上https://
 * @returns 
 */
async function markdown(session, command, imageUrl) {
  const mdid = config.markdown_setting.mdid;
  const mdkey1 = config.markdown_setting.zlmdp_1;
  const mdkey2 = config.markdown_setting.zlmdp_2;

  const zltext_1_options = config.markdown_setting.zltext_1;
  const zltext_2_options = config.markdown_setting.zltext_2;

  const zltext_1 = zltext_1_options[Math.floor(Math.random() * zltext_1_options.length)];
  const zltext_2 = zltext_2_options[Math.floor(Math.random() * zltext_2_options.length)];

  let zlmdtext_1 = config.markdown_setting.zlmdtext_1;
  let zlmdtext_2 = config.markdown_setting.zlmdtext_2;

  const ButtonText1 = config.markdown_setting.ButtonText1;
  const ButtonText2 = config.markdown_setting.ButtonText2;

  const emojihub_bili_command = config.emojihub_bili_command;

  const canvasimage = await ctx.canvas.loadImage(imageUrl);
  let originalWidth = canvasimage.naturalWidth || canvasimage.width;
  let originalHeight = canvasimage.naturalHeight || canvasimage.height;

  const MinimumTarget = config.markdown_setting.MinimumBoundary; 
  const magnifyTarget = config.markdown_setting.Magnifymultiple; 
  // 等比放大图片
  if (originalWidth < MinimumTarget || originalHeight < MinimumTarget) {
    const scale = magnifyTarget / Math.min(originalWidth, originalHeight);
    originalWidth = Math.round(originalWidth * scale);
    originalHeight = Math.round(originalHeight * scale);
    if(config.consoleinfo) {logger.info(`宽度放大到了 ${originalWidth} 高度放大到了 ${originalHeight}`);}
  }
  
  return {
    msg_type: 2,
    msg_id: session.messageId,
    markdown: {
      custom_template_id: mdid, //md的模版id
      params: [
        {
            key: zlmdtext_1,
            values: [zltext_1],//这是第一段文字
        },
        {
            key: zlmdtext_2,
            values: [zltext_2],//这是第二段文字
        },
        {
          key: mdkey1,  //md参数1
          values: [`![img#${originalWidth}px #${originalHeight}px]`],
        },
        {
          key: mdkey2,  //md参数2
          values: [`(${imageUrl})`],
        },
      ]
    },
    keyboard: {
      content: {
        rows: [
          {
            buttons: [
              {
                render_data: { label: `${ButtonText1}`, style: 2 },// 按钮显示的文字。style是按钮样式，有0、1、2
                action: {
                  type: 2, // 指令按钮
                  permission: { type: 2 }, // 所有人可点击
                  data: `/${command}`, // 点击后发送
                  enter: true, // 若 false 则填入输入框
                },
              },
              {
                render_data: { label: `${ButtonText2}`, style: 2 },
                action: {
                  type: 2,
                  permission: { type: 2 },
                  data: `/${emojihub_bili_command}`,
                  enter: true,
                },
              },
            ]
          },
        ],
      },
    },
  }
}

  let acmd=[]
  config.MoreEmojiHub.forEach(({ command, source_url }) => {
    acmd.push(command)     
    ctx.command(config.emojihub_bili_command,'Emojihub emoticon function')
       .action(async ({ session }) => {
    const txtCommandList = listAllCommands(config);
    if (config.consoleinfo) {
    logger.info(`指令列表txtCommandList：  ` + txtCommandList);
    }
    if (config.MDswitch && config.markdown_setting.mdid &&
        config.markdown_setting.zlmdp_1 && config.markdown_setting.zlmdp_2 &&
        session.platform === 'qq') {
        // 使用 Markdown 发送命令列表
        const markdownMessage = command_list_markdown(session, txtCommandList, config);
        //await session.send(markdownMessage);
        await session.qq.sendMessage(session.channelId, markdownMessage); 
    } else {
        // 否则，发送文本列表
        const commandText = txtCommandList.join('\n');
        await session.send( session.text(`commands.${emojihub_bili_codecommand}.messages.List_of_emojis`) + `\n` + commandText);
    }
}
);

    ctx.command(`${config.emojihub_bili_command}/${command}`)
      .action(async ({ session }) => {
        const imageResult =await determineImagePath(source_url, config, session.channelId, command, ctx);
        if (!imageResult.imageUrl) {
            // 如果没有图片返回，发送错误消息
            return session.text(`commands.${emojihub_bili_codecommand}.messages.notfound_txt`) + command;
        }
    
        try {
            let message;
            if (config.MDswitch && config.markdown_setting.mdid &&
                config.markdown_setting.zlmdp_1 && config.markdown_setting.zlmdp_2 &&
                session.platform === 'qq') {
                // MD发送图片的逻辑
                //logger.info(`MD发送图片`);
                if (imageResult.isLocal) {
                    // 如果是本地图片，使用本地图片的逻辑
                    if (config.localPicToBase64) {
                      //本地base64发图
                      let imagebase64 = await getImageAsBase64(imageResult.imageUrl);
                      //logger.info(imagebase64)

                      let MDimagebase64 = 'data:image/png;base64,' + imagebase64;
                      message = session.qq.sendMessage(session.channelId, await markdown(session, command, MDimagebase64));

                    } else if(config.QQPicToChannelUrl) {

                    const uploadedImageURL = await uploadImageToChannel(ctx, config.consoleinfo, url_1.pathToFileURL(imageResult.imageUrl).href , session.bot.config.id, session.bot.config.secret, config.QQchannelId);
                    
                    message = session.qq.sendMessage(session.channelId, await markdown(session, command, uploadedImageURL.url));

                    } else {
                    //正常本地文件发图
                    const imageUrl = url_1.pathToFileURL(imageResult.imageUrl).href;  
                    message = session.qq.sendMessage(session.channelId, await markdown(session, command, imageUrl));
                    }
                } else {
                    // 网络URL
                    message = session.qq.sendMessage(session.channelId, await markdown(session, command, imageResult.imageUrl));
                }
            } else {
              //logger.info(`正常情况`);
              //message = await session.send(koishi_1.h.image(imageUrl));
              // 根据图片是否为本地图片选择发送方式
              if (imageResult.isLocal) {
                  // 如果是本地图片，使用本地图片的逻辑
                  if (config.localPicToBase64) {
                    //本地base64发图
                    let imagebase64 = await getImageAsBase64(imageResult.imageUrl);
                    //logger.info(imagebase64)
                    message = await session.send(koishi_1.h('image', { url: 'data:image/png;base64,' + imagebase64}));

                  } else {
                  //正常本地文件发图
                  const imageUrl = url_1.pathToFileURL(imageResult.imageUrl).href;  
                  message = await session.send(koishi_1.h.image(imageUrl));  
                  }
              } else {
                  // 网络URL
                  message = await session.send(koishi_1.h.image(imageResult.imageUrl));  
              }
            }           
              if (config.deleteMsg && config.deleteMsgtime > 0) {
                setTimeout(async () => {
                  try {
                    await session.bot.deleteMessage(session.channelId, message);
                  } catch (error) {
                    logger.error(`撤回消息失败: ${error}`);
                  }
                }, config.deleteMsgtime * 1000);
              }
            } catch (error) {
              logger.error(`Error sending image:  ${error}`);
            }
        });
  }); 
  
  
  if (config.autoEmoji && (config.groupListmapping.length || config.allgroupautoEmoji)) {
    const groups = {};
  
    // 初始化特定群组的配置
    config.groupListmapping.forEach(({ groupList, defaultemojicommand, enable }) => {
      // 只有当enable为false或未定义时，才将群组添加到启用列表中
      if (enable === false) {
        groups[groupList] = { count: 0, emojicommand: defaultemojicommand };
      } else {
        // 如果enable为true，则将该群组标记为黑名单
        groups[groupList] = { blacklisted: true };
      }
    });
  
    ctx.middleware(async (session, next) => {
      const channelId = session.channelId;
      
      // 确定当前群组是否在特定配置中并且是否被黑名单
      let groupConfig = groups[channelId];
  
      // 如果当前群组标记为黑名单，则直接跳过处理
      if (groupConfig && groupConfig.blacklisted) {
        return next();
      }
  
      // 如果当前群组没有特定配置，并且开启了全部群组自动表情包
      if (!groupConfig && config.allgroupautoEmoji) {
        // 初始化为全部群组的配置
        groupConfig = { count: 0, emojicommand: config.allgroupemojicommand };
        // 如果此群组被黑名单，则不记录配置
        if (!groups[channelId] || !groups[channelId].blacklisted) {
          groups[channelId] = groupConfig;
        }
      }
  
      // 如果当前群组没有特定配置，并且开启了全部群组自动表情包
      if (!groupConfig && config.allgroupautoEmoji) {
        // 初始化为全部群组的配置
        groupConfig = { count: 0, emojicommand: config.allgroupemojicommand };
        groups[channelId] = groupConfig; // 记录配置以供后续使用
      }
  
      // 如果存在配置，处理表情包逻辑
      if (groupConfig) {
        groupConfig.count++; // 增加消息计数
        
        // 达到触发条件
        if (groupConfig.count >= config.count) {
          const randomNumber = Math.random();
          // 触发概率判断
          if (randomNumber <= config.triggerprobability) {
            let emojicommands = groupConfig.emojicommand.split(/\n|,|，/).map(cmd => cmd.trim());
            const randomCommand = emojicommands[Math.floor(Math.random() * emojicommands.length)];
            const emojiConfig = config.MoreEmojiHub.find(({ command }) => command === randomCommand);
            if (emojiConfig) {
              const imageResult =await determineImagePath(emojiConfig.source_url, config, channelId, emojiConfig.command, ctx);
              if (imageResult.imageUrl) {
                try {
                  groupConfig.count = 0; // 重置消息计数
                  let message;
                  if (imageResult.isLocal) { //本地图片
                    //const imageUrl = url_1.pathToFileURL(imageResult.imageUrl).href;
                    //message = koishi_1.h.image(imageUrl);
                    if (config.localPicToBase64) {
                      //本地base64发图
                      let imagebase64 = await getImageAsBase64(imageResult.imageUrl);
                      //logger.info(imagebase64)
                      message = koishi_1.h('image', { url: 'data:image/png;base64,' + imagebase64});
                    } else {
                    //正常本地文件发图
                    const imageUrl = url_1.pathToFileURL(imageResult.imageUrl).href;  
                    message = koishi_1.h.image(imageUrl);
                    }
                  } else {
                    message = koishi_1.h.image(imageResult.imageUrl);
                  }
                  let sentMessage = await session.send(message);
                  // 如果需要撤回消息
                  if (config.deleteMsg && config.deleteMsgtime > 0) {
                    setTimeout(async () => {
                      try {
                        await session.bot.deleteMessage(session.channelId, sentMessage);
                      } catch (error) {
                        logger.error(`撤回消息失败: ${error}`);
                      }
                    }, config.deleteMsgtime * 1000);
                  }
                } catch (error) {
                  logger.error(`发送图片错误: ${error}`);
                }
              } else {
                groupConfig.count = 0; // 图片不存在，重置计数
              }
            }
          } else {
            groupConfig.count = 0; // 没有触发表情包，重置计数
          }
        }
      }
      return next();
    }, true);
  }  
    
}  

exports.apply = apply;