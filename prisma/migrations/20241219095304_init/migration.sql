-- CreateTable
CREATE TABLE "section" (
    "sid" SERIAL NOT NULL,
    "section_name" VARCHAR(10) NOT NULL,

    CONSTRAINT "section_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "product_category" (
    "pcid" SERIAL NOT NULL,
    "section_id" INTEGER NOT NULL,
    "category_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("pcid")
);

-- CreateTable
CREATE TABLE "product" (
    "pid" SERIAL NOT NULL,
    "product_name" VARCHAR(500) NOT NULL,
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
    "product_id" INTEGER NOT NULL,
    "colour_id" INTEGER NOT NULL,

    CONSTRAINT "product_item_pkey" PRIMARY KEY ("piid")
);

-- CreateTable
CREATE TABLE "size_option" (
    "sid" SERIAL NOT NULL,
    "size_name" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "section_section_name_key" ON "section"("section_name");

-- AddForeignKey
ALTER TABLE "product_category" ADD CONSTRAINT "product_category_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "section"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("pcid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_image" ADD CONSTRAINT "product_image_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("piid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_item" ADD CONSTRAINT "product_item_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_item" ADD CONSTRAINT "product_item_colour_id_fkey" FOREIGN KEY ("colour_id") REFERENCES "colour"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variation" ADD CONSTRAINT "product_variation_product_item_id_fkey" FOREIGN KEY ("product_item_id") REFERENCES "product_item"("piid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variation" ADD CONSTRAINT "product_variation_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "size_option"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;
