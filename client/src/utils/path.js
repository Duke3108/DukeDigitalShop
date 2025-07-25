const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS: ':category',
    BLOGS: 'blogs',
    SERVICE: 'service',
    FAQ: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    FINAL_REGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'reset-password/:token',


    // Admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    CREATE_PRODUCT: 'create-product',
    MANAGE_PRODUCT: 'manage-product',
    MANAGE_USER: 'manage-user',
    MANAGE_ORDER: 'manage-order',

    // Member
    MEMBER: 'member',
    PERSONAL: 'personal',
}

export default path