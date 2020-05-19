const normalize = (products) => {

    return products.map(product => {
        // provera vrednosti napon
        if (product.napon !== "") {
            product.napon = product.napon.trim().split(' ').join('');
        } else {
            console.log(`Za sifru proizvoda ${product.sifra} napon nije ubacen.`);
            product.napon = "NIJE UBACEN";
        }

        // provera vrednosti boja
        if ( product.boja !== "") {
            const boja = product.boja.toLowerCase();
            switch (boja) {
                case 'schwarz': 
                    product.boja = 'crna';
                    break;

                case 'black': 
                    product.boja = 'crna';
                    break;

                default:
                    product.boja = product.boja.trim();    
            }
        } else {
            console.log(`Za sifru proizvoda ${product.sifra} boja nije ubacena.`);
            product.boja = "NIJE UBACEN";
        }



        // product.spPrecnik = product.sPrecnik.toString();
        // delete product.sPrecnik;
        // console.log(product);

        return product;
    });
};

module.exports = normalize;