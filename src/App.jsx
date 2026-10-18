
import { useEffect, useState } from 'react'
import './App.css'
import heroImage from './assets/foto_1.jpg'

const categories = [
  { id: 1, title: 'Космічна зброя', symbol: '✧', description: 'Ліцензійне обладнання' },
  { id: 2, title: 'Засоби захисту', symbol: '⬡', description: 'Броня та скафандри' },
  { id: 3, title: 'Транспорт', symbol: '⟢', description: 'Міжзоряні маршрути' },
  { id: 4, title: 'Ліки та енергія', symbol: '◈', description: 'Запаси для експедицій' },
  { id: 5, title: 'Космозоо', symbol: '𖠌', description: 'Фауна інших світів' },
  { id: 6, title: 'Артефакти', symbol: '◇', description: 'Реліквії старої Землі' },
]

const products = [
    {
        id: 1,
        name: 'Імпульсний бластер XR-7',
        category: 'Космічна зброя',
        price: 2450,
        description: 'Компактна модель для захисту експедицій.',
    },
    {
        id: 2,
        name: 'Скафандр «Мандрівник»',
        category: 'Засоби захисту',
        price: 3890,
        description: 'Захист для подорожей у невідомі світи.',
    },
    {
        id: 3,
        name: 'Шатл Outpost-7',
        category: 'Транспорт',
        price: 12500,
        description: 'Транспорт для міжзоряних маршрутів.',
    },
    {
        id: 4,
        name: 'Енергетичний модуль',
        category: 'Ліки та енергія',
        price: 780,
        description: 'Резерв енергії для тривалих експедицій.',
    },
    {
        id: 5,
        name: 'Люмінесцентний звір',
        category: 'Космозоо',
        price: 560,
        description: 'Рідкісний мешканець далеких планет.',
    },
    {
        id: 6,
        name: 'Артефакт «Пульсар»',
        category: 'Артефакти',
        price: 1990,
        description: 'Загадкова реліквія старої Землі.',
    },
]

function Header({ cartCount }) {
  return (
      <header className="site-header">
        <a className="brand" href="#home">
          <span className="brand-symbol">◎</span>
          <span>
          <strong>МОРЕ СОЛТОНА</strong>
          <small>ФЕДЕРАЦІЯ ВІЛЬНОЇ КОСМІЧНОЇ ТОРГІВЛІ</small>
        </span>
        </a>

        <nav className="navigation">
          <a href="#catalog">Каталог</a>
          <a href="#artifacts">Артефакти</a>
          <a href="#about">Про нас</a>
        </nav>

          <a className="cart-link" href="#cart">
              Кошик <span>{cartCount}</span>
          </a>
      </header>
  )
}

function Hero() {
  return (
      <section className="hero" id="home">
          <img className="hero-image" src={heroImage} alt="Старе крісло на березі Солтон-Сі" />
        <div className="hero-copy">
          <p className="eyebrow">МІЖЗОРЯНИЙ ТОРГОВЕЛЬНИЙ ВУЗОЛ</p>
          <h1>МОРЕ<br />СОЛТОНА</h1>
          <p className="hero-subtitle">
            Товари для тих, хто не визнає меж між зорями.
          </p>
          <a className="catalog-button" href="#catalog">
            ДО КАТАЛОГУ <span>→</span>
          </a>
          <p className="coordinates">
            СЕКТОР: ВІЛЬНА ТОРГІВЛЯ<br />
            СТАТУС: <span>ONLINE</span><br />
            КООРДИНАТИ: SALTON-SEA // OUTPOST-7
          </p>
        </div>

        <div className="hero-caption">
          ТУТ ЗУСТРІЧАЮТЬСЯ МАНДРІВНИКИ,
          <br /> ТОРГОВЦІ І ЗНАХІДКИ З ІНШИХ СВІТІВ.
        </div>
      </section>
  )
}

function CategoryCard({ category }) {
  return (
      <a
          className="category-card"
          href="#catalog"
          id={category.id === 6 ? 'artifacts' : undefined}
      >
        <span className="category-symbol">{category.symbol}</span>
        <span className="category-info">
        <strong>{category.title}</strong>
        <small>{category.description}</small>
        <span className="category-arrow">→</span>
      </span>
      </a>
  )
}

function ProductCard({ product, onAddToCart }) {
    return (
        <article className="product-card">
            <p className="product-category">{product.category}</p>
            <h3>{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-bottom">
                <strong>{product.price.toLocaleString('uk-UA')} кр.</strong>
                <button type="button" onClick={() => onAddToCart(product)}>
                    До кошика +
                </button>
            </div>
        </article>
    )
}

function Catalog({ onAddToCart }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('Усі')

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory =
            selectedCategory === 'Усі' || product.category === selectedCategory

        return matchesSearch && matchesCategory
    })

    return (

      <section className="catalog-section" id="catalog">
        <div className="section-heading">
          <p className="eyebrow">ТОРГОВЕЛЬНИЙ РЕЄСТР // 07</p>
          <h2>Категорії товарів</h2>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
          ))}
        </div>

          <div className="products-section" id="products">
              <div className="section-heading">
                  <p className="eyebrow">ТОВАРИ // SALTON-SEA</p>
                  <h2>Асортимент експедиції</h2>
              </div>

              <div className="search-box">
                  <input
                      type="text"
                      placeholder="Знайти товар..."
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                  />
              </div>

              <div className="filter-box">
                  <label htmlFor="category-filter">Категорія:</label>

                  <select
                      id="category-filter"
                      value={selectedCategory}
                      onChange={(event) => setSelectedCategory(event.target.value)}
                  >
                      <option value="Усі">Усі категорії</option>

                      {categories.map((category) => (
                          <option key={category.id} value={category.title}>
                              {category.title}
                          </option>
                      ))}
                  </select>
              </div>

              <div className="products-grid">
                  {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                          <ProductCard
                              key={product.id}
                              product={product}
                              onAddToCart={onAddToCart}
                          />
                      ))
                  ) : (
                      <p>За вашим запитом товарів не знайдено.</p>
                  )}
              </div>
          </div>
      </section>
  )
}

function Cart({ cart, onRemove, onChangeQuantity }) {
    const total = cart.reduce(
        (sum, product) => sum + product.price * (product.quantity || 1),
        0
    )

    return (
        <section className="cart-section" id="cart">
            <div className="section-heading">
                <p className="eyebrow">ЗАМОВЛЕННЯ // SALTON-SEA</p>
                <h2>Твій кошик</h2>
            </div>

            {cart.length === 0 ? (
                <p>Кошик поки порожній.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map((product, index) => (
                            <div className="cart-item" key={`${product.id}-${index}`}>
                                <span className="cart-product-name">{product.name}</span>

                                <div className="quantity-controls">
                                    <button
                                        type="button"
                                        onClick={() => onChangeQuantity(product.id, -1)}
                                    >
                                        −
                                    </button>

                                    <span>{product.quantity || 1}</span>

                                    <button
                                        type="button"
                                        onClick={() => onChangeQuantity(product.id, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <strong>
                                    {product.price.toLocaleString('uk-UA')} кр.
                                </strong>
                                <button type="button" onClick={() => onRemove(index)}>
                                    Видалити
                                </button>
                            </div>
                        ))}
                    </div>

                    <p className="cart-total">
                        Разом: {total.toLocaleString('uk-UA')} кр.
                    </p>
                </>
            )}
        </section>
    )
}

function App() {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('saltona-cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem('saltona-cart', JSON.stringify(cart))
    }, [cart])


    function addToCart(product) {
        setCart((currentCart) => {
            const existingProduct = currentCart.find(
                (item) => item.id === product.id
            )

            if (existingProduct) {
                return currentCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                )
            }

            return [...currentCart, { ...product, quantity: 1 }]
        })
    }

    function removeFromCart(indexToRemove) {
        setCart((currentCart) =>
            currentCart.filter((product, index) => index !== indexToRemove)
        )
    }


    function changeQuantity(productId, amount) {
        setCart((currentCart) =>
            currentCart
                .map((product) =>
                    product.id === productId
                        ? { ...product, quantity: (product.quantity || 1) + amount }
                        : product
                )
                .filter((product) => product.quantity > 0)
        )
    }

    return (

         <div className="store">
             <Header
                 cartCount={cart.reduce(
                     (sum, product) => sum + (product.quantity || 1),
                     0
                 )}
             />
        <main>
          <Hero />
            <Catalog onAddToCart={addToCart} />
            <Cart
                cart={cart}
                onRemove={removeFromCart}
                onChangeQuantity={changeQuantity}
            />
          <section className="about-section" id="about">
            <p className="eyebrow">АРХІВ СОЛТОНА // ЗЕМЛЯ</p>
            <h2>Не все, що зникло, втрачено.</h2>
            <p>Рідкісні речі, забуті історії та знахідки з далеких світів.</p>
          </section>
        </main>
        <footer className="site-footer">
          MORE SOLTONA <span>///</span> FEDERATION FREE TRADE
        </footer>
      </div>
  )
}

export default App
