// 食品類圖片
import catFood from './food/cat-food.jpg';
import dogBoneClean from './food/dog-bone-clean.jpg';

// 玩具類圖片
import catTunnel from './toy/cat-tunnel.jpg';

// 配件類圖片
import petWaterDispenser from './accessories/pet-water-dispenser.jpg';
import petFeeder from './accessories/pet-feeder.jpg';
import catLitterBox from './accessories/cat-litter-box.jpg';

// 導出所有圖片對象
export const images = {
  food: {
    catFood,
    dogBoneClean
  },
  toy: {
    catTunnel
  },
  accessories: {
    petWaterDispenser,
    petFeeder,
    catLitterBox
  }
};

// 取得產品圖片的輔助函數
export const getProductImage = (category, name) => {
  // 圖片名稱與產品的對應表
  const imageMapping = {
    food: {
      '高級貓糧': 'catFood',
      '狗狗潔牙骨': 'dogBoneClean'
    },
    toy: {
      '貓咪隧道玩具': 'catTunnel'
    },
    accessories: {
      '寵物自動飲水機': 'petWaterDispenser',
      '寵物自動喂食器': 'petFeeder',
      '貓砂盆': 'catLitterBox'
    }
  };
  
  // 檢查映射是否存在
  if (imageMapping[category] && imageMapping[category][name]) {
    const imageName = imageMapping[category][name];
    return images[category][imageName];
  }
  
  // 返回預設圖片或 null
  return null;
};

export default images;
