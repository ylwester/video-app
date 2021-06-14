import React from 'react'
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import '../styles/movieCard.css'

interface MovieCardProps {
  movie: IMovie,
}

export const MovieCard: React.FC<MovieCardProps> = ({movie}) => {
        return (
            <div> 
                      <Card className="movie-card">
        <CardImg top width="318px" height="180px" src={movie.thumbnail} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{movie.title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
          <CardText>aa</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
            </div>
        );
}