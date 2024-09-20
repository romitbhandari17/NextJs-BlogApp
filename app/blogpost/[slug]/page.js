import React from 'react'
import styles from '../blogpost.module.css';

const Blogpost = ({ params }) => {
  return (
    <div className={styles.divWrap} style={{ display: 'flex', justifyContent: 'center', flexDirection:'column', textAlign:'left'}}>
      <h2>Title of the page: {params.slug}</h2>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio doloremque iste odio ex, veniam ipsam inventore! Eveniet quas dolores dolorum libero, ratione iste.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, itaque sint, facere iusto eveniet provident consequatur vitae quidem voluptatibus autem doloribus dolor id quas sequi blanditiis suscipit dicta qui rerum voluptatum in nihil magni. Nisi in suscipit molestias nostrum. Sed minus enim porro itaque laudantium.
      </p>
    </div>
  )
}

export default Blogpost