import { decimal, weight } from "@dastkari/misc";
import { ProductUpdatePageSubmitData } from "@dastkari/products/components/ProductUpdatePage";
import { ProductDetails_product } from "@dastkari/products/types/ProductDetails";
import { ProductImageCreateVariables } from "@dastkari/products/types/ProductImageCreate";
import { ProductImageReorderVariables } from "@dastkari/products/types/ProductImageReorder";
import { ProductUpdateVariables } from "@dastkari/products/types/ProductUpdate";
import { SimpleProductUpdateVariables } from "@dastkari/products/types/SimpleProductUpdate";
import { ReorderEvent } from "@dastkari/types";
import { arrayMove } from "react-sortable-hoc";
import { mapFormsetStockToStockInput } from "@dastkari/products/utils/data";

export function createUpdateHandler(
  product: ProductDetails_product,
  updateProduct: (variables: ProductUpdateVariables) => void,
  updateSimpleProduct: (variables: SimpleProductUpdateVariables) => void
) {
  return (data: ProductUpdatePageSubmitData) => {
    const productVariables: ProductUpdateVariables = {
      attributes: data.attributes.map(attribute => ({
        id: attribute.id,
        values: attribute.value[0] === "" ? [] : attribute.value
      })),
      basePrice: decimal(data.basePrice),
      category: data.category,
      chargeTaxes: data.chargeTaxes,
      collections: data.collections,
      descriptionJson: JSON.stringify(data.description),
      id: product.id,
      isPublished: data.isPublished,
      name: data.name,
      publicationDate:
        data.publicationDate !== "" ? data.publicationDate : null,
      seo: {
        description: data.seoDescription,
        title: data.seoTitle
      }
    };

    if (product.productType.hasVariants) {
      updateProduct(productVariables);
    } else {
      updateSimpleProduct({
        ...productVariables,
        addStocks: data.addStocks.map(mapFormsetStockToStockInput),
        deleteStocks: data.removeStocks,
        productVariantId: product.variants[0].id,
        productVariantInput: {
          sku: data.sku,
          trackInventory: data.trackInventory
        },
        updateStocks: data.updateStocks.map(mapFormsetStockToStockInput),
        weight: weight(data.weight)
      });
    }
  };
}

export function createImageUploadHandler(
  id: string,
  createProductImage: (variables: ProductImageCreateVariables) => void
) {
  return (file: File) =>
    createProductImage({
      alt: "",
      image: file,
      product: id
    });
}

export function createImageReorderHandler(
  product: ProductDetails_product,
  reorderProductImages: (variables: ProductImageReorderVariables) => void
) {
  return ({ newIndex, oldIndex }: ReorderEvent) => {
    let ids = product.images.map(image => image.id);
    ids = arrayMove(ids, oldIndex, newIndex);
    reorderProductImages({
      imagesIds: ids,
      productId: product.id
    });
  };
}
