import isNil from "../is/isNil";
import randi from "../math/randi";
import padEnd from "../string/padEnd";
import padZ from "../string/padZ";
/**
 * 生成一个64bit整数的雪花id并返回，具体格式如下：
 * <code>
 * 0 - timestamp                                       - nodeId       - sequence<br>
 * 0 - [0000000000 0000000000 0000000000 0000000000 0] - [0000000000] - [000000000000]
 * </code>
 * 可用于客户端生成可跟踪统计的id，如定制终端
 * @example
 * // 343155438738309188
 * console.log(_.snowflakeId(123))
 * // 78249955004317758
 * console.log(_.snowflakeId(456,new Date(2022,1,1).getTime()))
 *
 * @param nodeId 节点id，10bit整数
 * @param [epoch=1580486400000] 时间起点，用于计算相对时间戳
 * @returns snowflakeId 由于js精度问题，直接返回字符串而不是number，如果nodeId为空返回 '0000000000000000000'
 * @since 1.4.0
 */
function snowflakeId(nodeId: number, epoch?: number): string {
  epoch = epoch || 1580486400000
  if (isNil(nodeId)) return '0000000000000000000'

  let nowTime = Date.now()

  // 12bits for seq
  if (lastTimeStamp === nowTime) {
    sequence += randi(1, 9)
    if (sequence > 0xfff) {
      nowTime = _getNextTime(lastTimeStamp)
      sequence = randi(0, 99)
    }
  } else {
    sequence = randi(0, 99)
  }

  lastTimeStamp = nowTime

  // 41bits for time
  const timeOffset = (nowTime - epoch).toString(2)
  // 10bits for nodeId
  const nodeBits = padEnd((nodeId % 0x3ff).toString(2) + '', 10, '0')
  // 12bits for seq
  const seq = padZ(sequence.toString(2) + '', 12)

  return BigInt(`0b${timeOffset}${nodeBits}${seq}`).toString()
}
let lastTimeStamp = -1
let sequence = 0
const _getNextTime = (lastTime: number) => {
  let t = Date.now()
  while (t <= lastTime) {
    t = Date.now()
  }
  return t
}

export default snowflakeId