// const today = new Date();
// const todayStr = today.toISOString().split('T')[0];

// // Вчера (минус 1 день)
// const yesterday = new Date(today);
// yesterday.setDate(yesterday.getDate() - 1);
// const yesterdayStr = yesterday.toISOString().split('T')[0];

// // Позавчера (минус 2 дня)
// const dayBeforeYesterday = new Date(today);
// dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 2);
// const dayBeforeYesterdayStr = dayBeforeYesterday.toISOString().split('T')[0];

// console.log('Сегодня:', todayStr);
// console.log('Вчера:', yesterdayStr);
// console.log('Позавчера:', dayBeforeYesterdayStr);

//

// let complections = {
//   "2026-07-31": false,
//   "2026-07-30": true, // сегодня
//   "2026-07-29": true,
//   "2026-07-28": false,
//   "2026-07-27": true,
//   "2026-07-23": false,
//   "2026-07-22": false,
//   "2026-07-21": false,
//   "2026-07-15": false,
//   "2026-07-06": false,
//   "2026-07-02": false
// }

// console.log(Object.keys(complections).length)
// const trueDates = Object.keys(complections).filter(key => complections[key] === true);
// const today = new Date().toISOString().split('T')[0];
// console.log(today)

// let newStreak = 1;
// let count = 1;
// let day;
// for (let i = Object.keys(complections).length; i > 0; i--) {
//     day.setDate(new Date(today).getDate() - count)
//     count++;
// }


const getTotalStreak = (obj) => {
    const today = new Date().toISOString().split('T')[0];
    
    if (obj[today] !== true) {
        return 0;
    }
    
    let streak = 1;
    let currentDate = new Date(today);
    
    // Идём в прошлое, пока есть true
    while (true) {
        currentDate.setDate(currentDate.getDate() - 1);
           
        const dateStr = currentDate.toISOString().split('T')[0];   
        
        if (obj[dateStr] !== true) {    // Если нет ключа или значение false - прерываем
            break;
        }
        
        streak++;
    }
    
    return streak;
};

let complections = {
  "2026-07-31": false,
  "2026-07-30": true, // сегодня
  "2026-07-29": true,
  "2026-07-28": true,
  "2026-07-27": true,
  "2026-07-23": false,
  "2026-07-22": false,
  "2026-07-21": false,
  "2026-07-15": false,
  "2026-07-06": false,
  "2026-07-02": false
}

console.log(getTotalStreak(complections));

