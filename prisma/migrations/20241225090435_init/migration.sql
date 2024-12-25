-- CreateTable
CREATE TABLE "product_category" (
    "pcid" SERIAL NOT NULL,
    "category_name" VARCHAR(100) NOT NULL,
    "size_category_id" INTEGER,
    "parent_category_id" INTEGER,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("pcid")
);

-- CreateTable
CREATE TABLE "product" (
    "pid" SERIAL NOT NULL,
    "product_name" VARCHAR(500) NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_category_id" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "product_image" (
    "piid" SERIAL NOT NULL,
    "image_filename" VARCHAR(400) NOT NULL,
    "product_item_id" INTEGER NOT NULL,

    CONSTRAINT "product_image_pkey" PRIMARY KEY ("piid")
);

-- CreateTable
CREATE TABLE "colour" (
    "cid" SERIAL NOT NULL,
    "color_name" TEXT NOT NULL,

    CONSTRAINT "colour_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "product_item" (
    "piid" SERIAL NOT NULL,
    "original_price" INTEGER NOT NULL,
    "sale_price" INTEGER NOT NULL,
    "product_code" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "colour_id" INTEGER NOT NULL,

    CONSTRAINT "product_item_pkey" PRIMARY KEY ("piid")
);

-- CreateTable
CREATE TABLE "size_option" (
    "sid" SERIAL NOT NULL,
    "size_name" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,
    "size_category_id" INTEGER NOT NULL,

    CONSTRAINT "size_option_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "product_variation" (
    "pvid" SERIAL NOT NULL,
    "product_item_id" INTEGER NOT NULL,
    "qty_in_stock" INTEGER NOT NULL,
    "size_id" INTEGER NOT NULL,

    CONSTRAINT "product_variation_pkey" PRIMARY KEY ("pvid")
);

-- CreateTable
CREATE TABLE "size_category" (
    "sid" SERIAL NOT NULL,
    "size_category_name" TEXT NOT NULL,

    CONSTRAINT "size_category_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "attribute_type" (
    "aid" SERIAL NOT NULL,
    "attribute_name" TEXT NOT NULL,

    CONSTRAINT "attribute_type_pkey" PRIMARY KEY ("aid")
);

-- CreateTable
CREATE TABLE "attribute_option" (
    "aid" SERIAL NOT NULL,
    "attribute_type_id" INTEGER NOT NULL,
    "attribute_option_name" TEXT NOT NULL,

    CONSTRAINT "attribute_option_pkey" PRIMARY KEY ("aid")
);

-- CreateTable
CREATE TABLE "product_attribute" (
    "product_id" INTEGER NOT NULL,
    "attribute_option_id" INTEGER NOT NULL,

    CONSTRAINT "product_attribute_pkey" PRIMARY KEY ("product_id","attribute_option_id")
);

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_size_category_id_fkey" FOREIGN KEY ("size_category_id") REFERENCES "size_category"("sid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_parent_category_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "product_category"("pcid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("pcid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("piid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_item" ADD CONSTRAINT "product_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_item" ADD CONSTRAINT "product_item_colour_id_fkey" FOREIGN KEY ("colour_id") REFERENCES "colour"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "size_option" ADD CONSTRAINT "size_option_size_category_id_fkey" FOREIGN KEY ("size_category_id") REFERENCES "size_category"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variation" ADD CONSTRAINT "product_variation_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("piid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variation" ADD CONSTRAINT "product_variation_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "size_option"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_option" ADD CONSTRAINT "attribute_option_attribute_type_id_fkey" FOREIGN KEY ("attribute_type_id") REFERENCES "attribute_type"("aid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_attribute" ADD CONSTRAINT "product_attribute_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_attribute" ADD CONSTRAINT "product_attribute_attribute_option_id_fkey" FOREIGN KEY ("attribute_option_id") REFERENCES "attribute_option"("aid") ON DELETE RESTRICT ON UPDATE CASCADE;
