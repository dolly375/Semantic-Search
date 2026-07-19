import "./ResultCard.css";

function ResultCard({ medicine, score, symptoms }) {

  return (
    <div className="result-card">

      <div className="medicine-header">
        <h2>{medicine}</h2>
        <span>{(score * 100).toFixed(0)}% Match</span>
      </div>

      <hr />

      <p>
        <b>Symptoms:</b>
        <br />
        {symptoms}
      </p>

      <p>
        <b>Semantic Similarity:</b>
        {score}
      </p>

    </div>
  );
}

export default ResultCard;