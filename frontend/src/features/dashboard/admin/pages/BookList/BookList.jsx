import Card from "../../../../../shared/components/card/Card";
import BookImg from '../../../../../assets/images/Rich-Dad-Poor-Dad.jpg';
import Button from "../../../../../shared/components/Button/Button";

const BookList=()=>{
    const onEditBook=()=>{
        console.log('Editted...')
    }

    const onDeleteBook=()=>{
        console.log('Deleted...')
    }

    return(
        <div className="container mt-3">
            <div className="row">
                <Card 
                    srcImg={BookImg} 
                    title="Rich Dad Poor Dad"
                    author="Robert T. Kiyosaki"
                    className="h-75"
                    imgStyle={{maxHeight:350 + 'px'}}
                    style={{maxWidth:300 + 'px'}}
                >
                    <Button type="button" color="primary" label="Edit" onClick={onEditBook} />
                    <Button type="button" color="danger" label="Delete" onClick={onDeleteBook} />
                </Card>    
            </div>
        </div>
    )
}

export default BookList;