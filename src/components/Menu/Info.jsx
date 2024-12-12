import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardMedia, CardContent, Typography, Button, Paper, Stack, } from "@mui/material";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import "./menu.css";


const products = [
    {
        id: 1,
        name: "Burritos",
        price: 80,
        description:
            "Este platillo incluye tres tortillas de harina rellenas con carne, frijoles, arroz, queso, y vegetales como lechuga y pico de gallo. Ideales como comida completa o para compartir.",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Burrito_chihuahuense_de_chile_verde.jpg",
    },
    {
        id: 2,
        name: "Enchiladas verdes",
        price: 90,
        description: "Se sirven cuatro tortillas de maíz rellenas de pollo desmenuzado o queso, bañadas en salsa verde de tomatillo, decoradas con crema, queso y acompañadas de arroz y frijoles.",
        image: "https://editorialtelevisa.brightspotcdn.com/dims4/default/4a5dbdb/2147483647/strip/true/crop/996x560+2+0/resize/1440x810!/quality/90/?url=https%3A%2F%2Fk2-prod-editorial-televisa.s3.us-east-1.amazonaws.com%2Fbrightspot%2Fwp-content%2Fuploads%2F2019%2F05%2Fenchiladas-verdes.png",
    },
    {
        id: 3,
        name: "Pozole rojo",
        price: 120,
        description: "Se presenta en una porción grande, este guiso tradicional mexicano está preparado con maíz hominy, carne de cerdo y un caldo de chiles secos. Incluye rábanos, lechuga, orégano y tostadas para acompañar.",
        image: "https://editorialtelevisa.brightspotcdn.com/wp-content/uploads/2018/03/STPozole-rojo-de-cerdo.jpg",
      },
      {
        id: 4,
        name: "Tamales de pollo",
        price: 35,
        description: "Incluye dos tamales de masa de maíz rellenos de pollo en salsa roja o verde, cocidos al vapor y servidos con crema o salsa picante.",
        image: "https://patijinich.com/es/wp-content/uploads/sites/3/2017/11/405-tamales-de-pollo-con-salsa-verde.jpg",
      },
      {
        id: 5,
        name: "Quesadillas",
        price: 40,
        description: "Este plato consta de dos tortillas de maíz o harina rellenas de queso derretido, con la opción de agregar guisos como champiñones, flor de calabaza o chorizo.",
        image: "https://www.trajinerasxochimilco.com.mx/wp-content/uploads/2020/10/quesadillas-xochimilco-5.jpg",
      },
      {
        id: 6,
        name: "Sopes",
        price: 60,
        description: "Incluye tres bases gruesas de maíz fritas, cubiertas con frijoles refritos, carne, crema, queso fresco, lechuga y salsa al gusto.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSckhO-7fE6X2rUYqYTprHncuZIuC1dJ-PZHQ&s",
      },
      {
        id: 7,
        name: "Chiles en nogada",
        price: 150,
        description: "Se sirve un chile poblano relleno de picadillo dulce-salado, bañado con crema de nuez y decorado con granada y perejil. Es ideal como platillo principal.",
        image: "https://www.aceitesdeolivadeespana.com/wp-content/uploads/2019/05/receta_de_chiles_en_nogada-1000x768.jpeg",
      },
      {
        id: 8,
        name: "Pasta al pesto",
        price: 110,
        description: "Este platillo consta de una pizza mediana con una base delgada, salsa de tomate, mozzarella fresca y hojas de albahaca. Perfecta para 2-3 personas.",
        image: "https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/05/29/5ed11fb61d750.jpeg",
      },
      {
        id: 9,
        name: "Pizza Margarita",
        price: 130,
        description: "Este plato consta de dos tortillas de maíz o harina rellenas de queso derretido, con la opción de agregar guisos como champiñones, flor de calabaza o chorizo.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY7RbPLpeQGEKr-JMLB6L9kRdCTMtUbFJfJw&s",
      },
      {
        id: 10,
        name: "Hamburguesa clásica",
        price: 90,
        description: "Se sirve una hamburguesa con carne de res jugosa a la parrilla, lechuga, tomate, queso, cebolla y condimentos. Incluye una guarnición de papas fritas.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh9n5N5Nou3H88-MpyE8rVjX-0m6KpKam_jA&s",
      },
      {
        id: 11,
        name: "Sushi rolls",
        price: 180,
        description: "El plato incluye ocho rollos de arroz rellenos de pescado fresco, mariscos o vegetales, envueltos en alga nori. Se acompaña con salsa de soya, wasabi y jengibre encurtido.",
        image: "https://www.yummyhealthyeasy.com/wp-content/uploads/2018/04/california-sushi-rolls-square.jpg",
      },
      {
        id: 12,
        name: "Ramen",
        price: 120,
        description: "Un tazón grande de sopa japonesa con un caldo sabroso, fideos suaves, huevo cocido, cerdo char siu, algas y vegetales. Ideal como una comida completa.",
        image: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/17eefccc0612317aa9f2ce1fbaae56cc/Derivates/3740e0c14b97c50890905a1961b9eb542959cc06.jpg",
      },
      {
        id: 13,
        name: "Paella",
        price: 200,
        description: "Una porción generosa de arroz cocido con mariscos, pollo y chorizo, sazonado con azafrán y vegetales como pimientos. Ideal para compartir entre 2-3 personas.",
        image: "https://mandolina.co/wp-content/uploads/2024/04/paella-valenciana-1200x720.jpg",
      },
      {
        id: 14,
        name: "Ceviche de camarón",
        price: 140,
        description: "Este platillo incluye una porción mediana de camarones marinados en jugo de limón, mezclados con jitomate, cebolla, cilantro, aguacate y chile. Se sirve con tostadas o galletas saladas, perfecto para compartir.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFdSket2G5L_WUaiyp_dX3JFjZ0OIHU1hcyg&s",
      },
      {
        id: 15,
        name: "Agua fresca de horchata",
        price: 35,
        description:
          "Deliciosa bebida mexicana a base de arroz, canela y leche, ligeramente endulzada. Se sirve en un vaso grande de 500 ml.",
        image: "https://png.pngtree.com/png-clipart/20220103/original/pngtree-fruit-tea-png-image_7018756.png",
      },
      {
        id: 16,
        name: "Limonada con chía",
        price: 40,
        description: "Refrescante mezcla de jugo de limón natural, agua mineral y semillas de chía, servida en un vaso de 500 ml.",
        image: "https://png.pngtree.com/png-clipart/20240618/original/pngtree-chia-seed-drink-with-water-and-lemon-balm-in-a-transparent-png-image_15356255.png",
      },
      {
        id: 17,
        name: "Coca-Cola",
        price: 30,
        description: "Clásica bebida gaseosa con su distintivo sabor, servida en una botella de 355 ml o en un vaso con hielo.",
        image: "https://static.vecteezy.com/system/resources/previews/037/751/381/non_2x/coca-cola-plastic-bottle-isolated-on-transparent-background-free-png.png",
      },
      {
        id: 18,
        name: "Sprite",
        price: 30,
        description: "Refrescante bebida gaseosa de limón y lima, servida en una lata de 355 ml o en un vaso con hielo.",
        image: "https://pngimg.com/d/sprite_PNG98770.png",
      },
      {
        id: 19,
        name: "Fanta",
        price: 30,
        description: "Bebida gaseosa con un dulce y vibrante sabor a naranja, disponible en botella de 355 ml o en vaso con hielo.",
        image: "https://www.pngarts.com/files/17/Fanta-PNG-Free-HQ-Download.png",
      },
      {
        id: 20,
        name: "Pepsi",
        price: 30,
        description: "Alternativa popular a la Coca-Cola, con un sabor dulce y burbujeante, servida en una lata de 355 ml o en un vaso con hielo.",
        image: "https://www.pngarts.com/files/3/Pepsi-PNG-Transparent-Image.png",
      },
];

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find((item) => item.id === parseInt(id));

    if (!product) {
        return <Typography variant="h6">Producto no encontrado</Typography>;
    }

    return (
        <Container maxWidth='lg'>
            <Box sx={{ paddingTop: 8, paddingBottom: 2 }}>
                <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
                    <Grid  xs={6} sm={5} md={5} key={product.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: { xs: 120, sm: 150, md: 180 }, height: { xs: 120, sm: 150, md: 180 }, borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                        <img src={product.image} style={{width:'80%', height:'80%', objectFit: 'fill'}} />
                    </div>
                        </div>
              
                        <Typography variant="h4" sx={{
                            color: "#f39c12",
                            fontWeight: "bold",
                            paddingTop: 1,
                            textAlign: 'justify',
                        }}
                        >
                            ${product.price} MXN
                        </Typography>
                    </Grid>
                    {/* Detalles del producto */}
                    <Grid  xs={7} sm={5} md={5}>
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: "bold", marginBottom: "20px", color: 'white' }}
                        >
                            {product.name}
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                lineHeight: "1.8",
                                fontSize: "1rem",
                                marginBottom: "20px",
                                color: 'white'
                            }}
                        >
                            {product.description}
                        </Typography>

                    </Grid>
                </Grid>
            </Box>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#f39c12",
                        color: "#fff",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#d9820f" },
                    }}
                    onClick={() => navigate("/menuqr")}
                >
                    Regresar
                </Button>
            </div>

        </Container>
    );
}

export default ProductDetail;