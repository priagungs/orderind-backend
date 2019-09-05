import { NlpManager } from "node-nlp";

const generalModel = new NlpManager({ languages: ['id'] });
const ORDER_LISTING = 'list.order'
const PRODUCT_LISTING = 'list.produk'
// order listing
generalModel.addDocument('id', 'ada order apa aja ya hari ini ?', ORDER_LISTING);
generalModel.addDocument('id', 'mau lihat order hari ini dong', ORDER_LISTING);
generalModel.addDocument('id', 'hari ini ada orderan apa aja ya', ORDER_LISTING);
generalModel.addDocument('id', 'daftarin order yang masuk dong', ORDER_LISTING);
generalModel.addDocument('id', 'mau daftar order', ORDER_LISTING);
generalModel.addDocument('id', 'tolong daftar order yang masuk', ORDER_LISTING);
generalModel.addDocument('id', 'mau proses order', ORDER_LISTING);
generalModel.addDocument('id', 'daftar order', ORDER_LISTING);
generalModel.addDocument('id', 'orderan yang masuk', ORDER_LISTING);
generalModel.addDocument('id', 'daftar order sekarang', ORDER_LISTING);
generalModel.addDocument('id', 'semua order yang masuk', ORDER_LISTING);
generalModel.addDocument('id', 'daftar semua order', ORDER_LISTING);
generalModel.addDocument('id', 'penjualan hari ini', ORDER_LISTING);
generalModel.addDocument('id', 'ada penjualan apa aja hari ini ?', ORDER_LISTING);
generalModel.addDocument('id', 'mau lihat daftar order yang masuk dong', ORDER_LISTING);

// product listing
generalModel.addDocument('id', 'daftar semua produk', PRODUCT_LISTING);
generalModel.addDocument('id', 'produk yang saya punya', PRODUCT_LISTING);
generalModel.addDocument('id', 'saya ada produk apa aja ya', PRODUCT_LISTING);
generalModel.addDocument('id', 'saya jualan apa aja ya', PRODUCT_LISTING);
generalModel.addDocument('id', 'di gudang ada apa aja ya ?', PRODUCT_LISTING);
generalModel.addDocument('id', 'mau dong daftar semua produk yang ada', PRODUCT_LISTING);
generalModel.addDocument('id', 'produk produk di etalase', PRODUCT_LISTING);
generalModel.addDocument('id', 'di etalase ada produk apa aja ya ?', PRODUCT_LISTING);
generalModel.addDocument('id', 'daftarkan semua produk yang sedang dijual', PRODUCT_LISTING);
generalModel.addDocument('id', 'produk yang dijual', PRODUCT_LISTING);
generalModel.addDocument('id', 'produk produk yang ada', PRODUCT_LISTING);
generalModel.addDocument('id', 'barang yang dijual', PRODUCT_LISTING);
generalModel.addDocument('id', 'semua barang saya', PRODUCT_LISTING);
generalModel.addDocument('id', 'Saya jualan barang apa aja', PRODUCT_LISTING);
generalModel.addDocument('id', 'daftar barang jualan saya', PRODUCT_LISTING);

