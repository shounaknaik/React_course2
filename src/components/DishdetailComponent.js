import React from 'react';
import {Card, CardImg, CardImgOverlay, CardText,CardBody, CardTitle} from 'reactstrap';




	
	function RenderComment({comments})
	{
		const cmt=comments.map((comments)=>{
			 return (
                <li key={comments.id}>
                    <p>{comments.comment}</p>
                    <p>-- {comments.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
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

	function RenderItem({dish}){
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

	const DishDetail=(props)=>
	{
		const dish=props.dish;
		if(dish==null)
		{
			return(<div></div>);
		}
	
		return(
			<div className="row">
				<RenderItem dish={props.dish}/>
				<RenderComment comments={props.dish.comments}/>
			</div>
		);
	}


export default DishDetail;