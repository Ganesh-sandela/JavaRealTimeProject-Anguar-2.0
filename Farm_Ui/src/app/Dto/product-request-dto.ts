export class ProductRequestDTO {

  public name: string = '' ;
  public description: string = '';
  public categoryId: number = 0;
  public unitPrice: number = 0;
  public unit: string = '';
  public unitsInStock: number = 0;
  public harvestDate: Date | null = null;
  public organic: boolean = false;
  public active: boolean = false;
  public location: string = '';
  public image: File| null = null;
  public userId:number | null=0

  constructor(
    name: string,
    description: string,
    categoryId: number,
    unitPrice: number,
    unit: string,
    unitsInStock: number,
    harvestDate: Date | null,
    organic: boolean,
    active: boolean,
    location: string,
    image: File | null,
    userId:number
  ) {
    this.name = name;
    this.description = description;
    this.categoryId = categoryId;
    this.unitPrice = unitPrice;
    this.unit = unit;
    this.unitsInStock = unitsInStock;
    this.harvestDate = harvestDate;
    this.organic = organic;
    this.active = active;
    this.location = location;
    this.image = image;
    this.userId=userId;
  }
}