import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';


const MenuPage = () => {
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
          }
    ];
    const bebidas = [
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
    const alcohol = [
      {
          id: 21,
          name: "Corona",
          price: 40,
          description:
            "Ingredientes: Cerveza Corona (puede servirse con una rodaja de lima en el cuello de la botella). Sabor: Ligera, refrescante y con un toque suave de cebada.",
          image: "https://superlavioleta.com/cdn/shop/files/corona_355ml.png?v=1697812834",
        },
        {
          id: 22,
          name: "Mojito de ron",
          price: 120,
          description: "Ingredientes: Ron blanco, hojas de menta, jugo de lima, azúcar, soda, y hielo. Sabor: Fresco, dulce y mentolado.",
          image: "https://png.pngtree.com/png-vector/20240623/ourmid/pngtree-delicious-fruity-fresh-mojito-vodka-rum-cocktail-png-image_12830377.png",
        },
        {
          id: 23,
          name: "Margarita",
          price: 100,
          description: "Ingredientes: Tequila, jugo de limón, licor de naranja (como Cointreau), y sal para el borde del vaso. Sabor: Refrescante, con un toque cítrico y ligeramente dulce.",
          image: "https://quidividibrewery.ca/cdn/shop/products/MargaritaCervezaShopifySize_1024x1024@2x.png?v=1608410004",
        },
  ];

    const pages = ['Alimentos', 'Bebidas', 'Alcohol'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate();
    const scrollToSection = (id) => {
      const section = document.getElementById(id);
      if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
          setTimeout(() => {
              window.scrollBy({ top: -70, behavior: "smooth" }); 
          }, 0);
      }
  };
      const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    return (
        <>
        <AppBar position='fixed'>
          <Container maxWidth='xl' sx={{backgroundColor: '#162D41'}}>
          <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
               <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page}  onClick={() => { scrollToSection(page); handleCloseNavMenu();
                }}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => scrollToSection(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
            </Toolbar>
          </Container>
        </AppBar>
            <Container maxWidth="lg">
                <Box sx={{ paddingTop: 12, paddingBottom: 5 }}>
                    <div> <Typography className="display-sm" variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
                        ¡Disfrútalos!
                    </Typography></div>
                    <div>
                        <Typography className='header-text' variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
                            Conoce nuestra bebidas y alimentos de la temporada
                        </Typography>
                    </div>
                </Box>
                {/* Alimentos */}
                <div id="Alimentos" className="subtitle-line">
                    <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
                        Alimentos
                    </Typography>
                </div>
                <Box sx={{ flexGrow: 1, paddingBottom: 5 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {products.map((product) => (
                            <Grid  key={product.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} size={{ xs: 2, sm: 4, md: 4 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Paper  onClick={() => navigate(`/product/${product.id}`)} sx={{ backgroundColor: '#442A10',  width: { xs: 120, sm: 150, md: 180 }, height: { xs: 120, sm: 150, md: 180 }, borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                                        <img style={{width: '85%', height: '55%', borderRadius: 20, objectFit: 'fill'}} src={product.image} alt="producto" className="img-product-menu" />
                                    </Paper>
                                </div>
                                <Typography variant="h6"  gutterBottom sx={{ fontWeight: 600, marginTop: 1, textAlign: 'center', color: 'white'}}>
                                        {product.name}
                                    </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                {/* Bebidas */}
                <div id="Bebidas" className="subtitle-line">
                    <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
                        Bebidas
                    </Typography>
                </div>
                <Box sx={{ flexGrow: 1, paddingBottom: 5 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {bebidas.map((bebidas) => (
                            <Grid  key={bebidas.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} size={{ xs: 2, sm: 4, md: 4 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Paper  onClick={() => navigate(`/product/${bebidas.id}`)} sx={{ backgroundColor: '#442A10',  width: { xs: 120, sm: 150, md: 180 }, height: { xs: 120, sm: 150, md: 180 }, borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                                        <img style={{width: '100%', height: '80%', borderRadius: 20, objectFit: 'contain'}} src={bebidas.image} alt="producto" className="img-product-menu" />
                                    </Paper>
                                </div>
                                <Typography variant="h6"  gutterBottom sx={{ fontWeight: 600, marginTop: 1, textAlign: 'center', color: 'white'}}>
                                        {bebidas.name}
                                    </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                 {/* Alcohol */}
                 <div id="Alcohol" className="subtitle-line">
                    <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, color: 'white' }}>
                        Alcohol
                    </Typography>
                </div>
                <Box sx={{ flexGrow: 1, paddingBottom: 5 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {alcohol.map((alcohol) => (
                            <Grid  key={alcohol.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} size={{ xs: 2, sm: 4, md: 4 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Paper  onClick={() => navigate(`/product/${bebidas.id}`)} sx={{ backgroundColor: '#442A10',  width: { xs: 120, sm: 150, md: 180 }, height: { xs: 120, sm: 150, md: 180 }, borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                                        <img style={{width: '100%', height: '80%', borderRadius: 20, objectFit: 'contain'}} src={alcohol.image} alt="producto" className="img-product-menu" />
                                    </Paper>
                                </div>
                                <Typography variant="h6"  gutterBottom sx={{ fontWeight: 600, marginTop: 1, textAlign: 'center', color: 'white'}}>
                                        {alcohol.name}
                                    </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
               
            </Container>
        </>
    );
}

export default MenuPage;