import React,{Component} from 'react';
import {Card, CardImg, CardText,CardBody, CardTitle,Breadcrumb,BreadcrumbItem, Button, Modal, ModalHeader,ModalBody,Row,Col, Label} from 'reactstrap';
import {LocalForm, Control,Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent.js'



	
	function RenderComment({comments,addComment,dishId})
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
			<CommentForm dishId={dishId} addComment={addComment} />
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
        if(props.isLoading){
            return(
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>

            );
        }
        else if(props.errMess){
            return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>

            );
        }
		else if(dish==null)
		{
            return(
            <div clas="container">
                     <Breadcrumb>
                        <BreadcrumbItem><Link to='/Menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                     <div className="col-12">
                        <h3> {props.dish.name}</h3>
                        <hr/>
                    </div>
                    <div className="row">
                        <RenderItem dish={props.dish}/>
                        <RenderComment comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}/>
                        
                    </div>
            </div>
        );
			
		}
	
		
	}


export default DishDetail;

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{

	constructor(props){
		super(props);
		this.state={
			isModalOpen:false
		};
		this.toggleModal=this.toggleModal.bind(this);
	}
	toggleModal()
	{
		this.setState({
			isModalOpen:!this.state.isModalOpen

		});
	}
	handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId,values.rating,values.author,values.comment);
       
    }

	render()
	{
		return (
			<div>
			<Button outline onClick={this.toggleModal}> <span className="fa fa-pencil" ></span> Submit Comment</Button>
			
			<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
				<ModalHeader> Submit Comment </ModalHeader>
				<ModalBody>
					<div className="col-12 col-md-8">
						<LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
							<Row className="form-group">
								<Label htmlFor="1to5" md={3}>Rating</Label>
								<Col md={9}>
									<Control.select model=".rating" name="1to5" className="form-control">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className="form-group">
								<Label htmlFor="name">Your name </Label>
								<Col md={9}>
									<Control.text model=".person" name="person" className="form-control" placeholder="Your Name"
									validators={{required,minLength:minLength(3),maxLength:maxLength(15)}}/>
									<Errors className="text-danger" model=".comment" show="touched" messages={{required: "Required  ",minLength:"Must be greater than 3 charachters",maxLength:"Must be 15 charachters"}}/>

										
								</Col>
							</Row>

                             <Row className="form-group">
                                <Label htmlFor="feedback" md={3}>Your feedback</Label>
                                    <Col md={9}>
                                        <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control"/>
                                    </Col>
                             </Row>
                             <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
					</div>

				 </ModalBody>
			</Modal>
			
			</div>
		);
	}

}