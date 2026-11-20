import styles from './ContributionCalendar.module.css';

const CELL_SIZE = 10;
const CELL_GAP = 3;
const COLUMN_WIDTH = CELL_SIZE + CELL_GAP;
const LABEL_WIDTH = 30;
const COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];

function getCalendarDays(contributions) {
  const contributionsByDate = new Map(contributions.map(({ date, count, level }) => [date, { count, level }]));
  const dates = [...contributionsByDate.keys()].sort();
  const firstDay = new Date(`${dates[0]}T00:00:00Z`);
  const lastDay = new Date(`${dates[dates.length - 1]}T00:00:00Z`);
  const calendarStart = new Date(firstDay);
  calendarStart.setUTCDate(calendarStart.getUTCDate() - calendarStart.getUTCDay());

  const days = [];
  for (const date = new Date(calendarStart); date <= lastDay; date.setUTCDate(date.getUTCDate() + 1)) {
    const isoDate = date.toISOString().slice(0, 10);
    days.push({
      date: isoDate,
      contribution: contributionsByDate.get(isoDate) || { count: 0, level: 0 },
      week: Math.floor((date - calendarStart) / (7 * 24 * 60 * 60 * 1000)),
      weekday: date.getUTCDay(),
      month: date.getUTCDate() === 1 ? date.toLocaleString('en', { month: 'short', timeZone: 'UTC' }) : null,
    });
  }
  return days;
}

export default function ContributionCalendar({ contributions }) {
  const days = getCalendarDays(contributions);
  const weekCount = days.at(-1).week + 1;
  const width = LABEL_WIDTH + weekCount * COLUMN_WIDTH;
  const months = days.filter(({ month }) => month);

  return (
    <div className={styles.scrollArea}>
      <svg className={styles.calendar} viewBox={`0 0 ${width} 112`} role="img" aria-label="Calendário de contribuições do GitHub dos últimos 12 meses">
        <g className={styles.weekdayLabels}>
          <text x="0" y="39">Mon</text><text x="0" y="65">Wed</text><text x="0" y="91">Fri</text>
        </g>
        <g className={styles.monthLabels}>
          {months.map(({ week, month }) => <text key={`${week}-${month}`} x={LABEL_WIDTH + week * COLUMN_WIDTH} y="10">{month}</text>)}
        </g>
        {days.map(({ date, contribution, week, weekday }) => (
          <rect
            key={date}
            x={LABEL_WIDTH + week * COLUMN_WIDTH}
            y={18 + weekday * COLUMN_WIDTH}
            width={CELL_SIZE}
            height={CELL_SIZE}
            rx="2"
            fill={COLORS[Math.min(Math.max(contribution.level || 0, 0), COLORS.length - 1)]}
          >
            <title>{`${contribution.count} contribuições em ${date}`}</title>
          </rect>
        ))}
      </svg>
    </div>
  );
}
