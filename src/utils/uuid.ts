import substring from "../string/substring";
import randi from "../math/randi";

const VARIANTS = ['8', '9', 'a', 'b']
/**
 * 生成一个32/36个字符组件的随机uuid(v4)并返回
 * @example
 * // ddfd73a5-62ac-4412-ad2b-fd495f766caf
 * console.log(_.uuid(true))
 * // ddfd73a562ac4412ad2bfd495f766caf
 * console.log(_.uuid())
 *
 * @param delimiter 是否生成分隔符
 * @returns uuid
 * @since 1.4.0
 */
function uuid(delimiter?: boolean): string {
  let uuid = ''
  if (self.crypto.randomUUID) {
    // only in https
    uuid = self.crypto.randomUUID()
  } else {
    const r32 = Math.random()
    const r16 = Math.random()
    const p1Num = Math.floor(r32 * (0xffffffff - 0x10000000)) + 0x10000000
    const p1 = p1Num.toString(16)
    const p2Num = Math.floor(r16 * (0xffff - 0x1000)) + 0x1000
    const p2 = p2Num.toString(16)
    const p3 = substring((p2Num << 1).toString(16), 0, 3)
    const p4 = substring((p2Num >> 1).toString(16), 0, 3)
    let p5 = Date.now().toString(16)
    p5 =
      substring((p1Num >> 1).toString(16), 0, 6) +
      substring(p5, p5.length - 6, p5.length)

    uuid =
      p1 + '-' + p2 + '-4' + p3 + '-' + VARIANTS[randi(0, 3)] + p4 + '-' + p5
  }
  return delimiter ? uuid : uuid.replace(/-/g, '')
}


export default uuid