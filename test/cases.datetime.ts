/**
 * 测试用例
 */
const Datas: Record<string, any[]> = {
  isSameDay: [
    [new Date('2020-05-01'), '2020/5/1', true],
    [new Date('2020-05-01 23:59:59.999'), '2020/5/2 0:0:0.000', false],
    ['2020/5/1', '2020-05-01', true],
  ],
  compareDate: [
    [new Date('2020/05/01'), '2020/5/1', 0],
    [new Date('2020-05-01'), '2020/5/1', 'h', 8],
    [new Date('2019/01/01'), '2019/3/1', -59],
  ],
  addTime: [
    [new Date('2020-05-01'), -20, 'd', new Date(2020, 3, 11, 8)],
    [new Date('2020-05-01'), 20, 's', new Date(2020, 4, 1, 8, 0, 20)],
    [new Date('2020-05-01'), 20, 'M', new Date(2022, 0, 1, 8)],
  ],
  formatDate: [
    [null, ''],
    ['2021-2-1', 'M/d/yyyy', '2/1/2021'],
    ['2021-2-1', 'M/d/yy', '2/1/21'],
  ],
  toDate: [
    [1320940800, new Date(1320940800000)],
    [[2022, 11, 12], new Date(2022, 11, 12)],
    ['2022/2/2', new Date('2022/2/2')],
  ],
  getDayOfYear: [
    [1667118460009, 303],
    [new Date(2020, 0, 1), 1],
    [new Date(2021, 11, 31), 365],
  ],
  getWeekOfYear: [
    [1667118460009, 45],
    [new Date(2021, 0, 1), 1],
    [new Date(2021, 11, 31), 53],
  ],
  getWeekOfMonth: [
    [new Date(2021, 0, 1), 1],
    [new Date(2021, 0, 15), 3],
    [new Date(2021, 5, 30), 5],
  ],
  isLeapYear: [
    [new Date(2020, 0, 1), true],
    [new Date(2021, 0, 1), false],
    [new Date(2000, 0, 1), true],
  ],
}

export default Datas
