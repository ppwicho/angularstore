import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router ,Params} from '@angular/router';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { ProductsService } from './../../../core/service/products/products.service';
import { MyValidators } from './../../../utils/validators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form : FormGroup; 
  id: string;

  constructor(
    private FormBuilder : FormBuilder,
    private productService: ProductsService,
    private router : Router,
    private activeRoute : ActivatedRoute,
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
    this.id = params.id;
    this.productService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue(product); //pre llanado del form 
      }); 
    });
  }

  saveProduct( event : Event ){
    event.preventDefault();
    if (this.form.valid){
      const product = this.form.value;
      console.log(this.id,product);
      this.productService.updateProduct(this.id, product)
      .subscribe(newProduct => {
        console.log(newProduct);
        this.router.navigate(['./admin/products']);
      });
    }
    
  }

  private buildForm(){
    this.form = this.FormBuilder.group({
      //id:['',[Validators.required]], // En edicion no cambiamos id
      title:['',[Validators.required]],
      price:[0,[Validators.required, MyValidators.isPriceValid]],
      image:'',
      description: ['',[Validators.required]],
    });
  }
  // Getter y Setter 
  get priceField(){
    return this.form.get('price');
  }
}
