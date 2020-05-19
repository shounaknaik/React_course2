import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText,CardBody, CardTitle} from 'reactstrap';



class Dishdetail extends Component{
	constructor(props)
	{
		super(props);
	}
	renderComment(comments)
	{
		const cmt=comments.map((comments)=>{
			 return (
                <li key={comments.id}>
                    <p>{comments.comment}</p>
                    <p>-- {comments.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comments.date))}
                    </p>
                </li>
            );

		});
		return(
			<div className="col-12 col-md-5 m-1">
			<h4 > Comments</h4>
			<ul className="list-untstyled">
				{cmt}
			</ul>
			</div>
		);
	}

	renderItem(dish){
		return(
				<div key={dish.id} className="col-12 col-md-5 m-1">
				 	<Card>
				 			
				 		<CardImg width="100%" src={dish.image} alt={dish.name}/>
				 			
				 		<CardBody>
				 			<CardTitle>{dish.name}</CardTitle>
				 			<CardText>{dish.description}</CardText>
				 		
				 		</CardBody>
				 	</Card>
				</div>
				);
	}

	render()
	{
		const dish=this.props.dish;
		if(dish==null)
		{
			return(<div></div>);
		}
		const item=this.renderItem(dish);
		const comment=this.renderComment(dish.comments);
		return(
			<div className="row">
				{item}
				{comment}
			</div>
		);
	}
}

export default Dishdetail;