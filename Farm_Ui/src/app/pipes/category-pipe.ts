import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
  standalone: true
})
export class CategoryPipe implements PipeTransform {

  private categories: { [key: number]: string } = {
    1: '🥬 Vegetables',
    2: '🍎 Fruits',
    3: '🌾 Grains & Cereals',
    4: '🥜 Pulses & Lentils',
    5: '🌿 Herbs & Spices',
    6: '🥛 Dairy Products',
    7: '🥚 Eggs',
    8: '🌼 Flowers',
    9: '🌱 Seeds',
    10: '🌳 Plants & Saplings',
    11: '🍯 Organic Products',
    12: '🧺 Dry Fruits & Nuts',
    13: '🍄 Mushrooms',
    14: '🐝 Honey',
    15: '🐟 Fish & Seafood',
    16: '🐔 Poultry',
    17: '🧴 Oils',
    18: '🧂 Masalas',
    19: '📦 Others'
  };

  transform(value: number): string {
    return this.categories[value] || 'Unknown';
  }
}