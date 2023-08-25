import './CardRecto.scss';

interface CardRectoProps {
  name: string;
  activities: string[];
  comments: string;
  className?: string; // La propriété optionnelle pour la classe CSS
}

function CardRecto({ name, activities, comments, className = '' }: CardRectoProps) {
  return (
    <div className={`card ${className}`}>
      <h3 className="card-name">{name}</h3>
      <ul className="card-activities">
        {activities.map((activity, activityId) => (
          <li key={activityId}>{activity}</li>
        ))}
      </ul>
      <p className="card-comments">{comments}</p>
    </div>
  );
}

export default CardRecto;
