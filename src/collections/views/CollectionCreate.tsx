import React from "react";
import { useIntl } from "react-intl";

import { WindowTitle } from "@dastkari/components/WindowTitle";
import useNavigator from "@dastkari/hooks/useNavigator";
import useNotifier from "@dastkari/hooks/useNotifier";
import { commonMessages } from "@dastkari/intl";
import { CollectionCreateInput } from "../../types/globalTypes";
import CollectionCreatePage from "../components/CollectionCreatePage/CollectionCreatePage";
import { TypedCollectionCreateMutation } from "../mutations";
import { CreateCollection } from "../types/CreateCollection";
import { collectionListUrl, collectionUrl } from "../urls";

export const CollectionCreate: React.FC = () => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleCollectionCreateSuccess = (data: CreateCollection) => {
    if (data.collectionCreate.errors.length === 0) {
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      navigate(collectionUrl(data.collectionCreate.collection.id));
    } else {
      const backgroundImageError = data.collectionCreate.errors.find(
        error =>
          error.field === ("backgroundImage" as keyof CollectionCreateInput)
      );
      if (backgroundImageError) {
        notify({
          text: intl.formatMessage(commonMessages.somethingWentWrong)
        });
      }
    }
  };
  return (
    <TypedCollectionCreateMutation onCompleted={handleCollectionCreateSuccess}>
      {(createCollection, createCollectionOpts) => (
        <>
          <WindowTitle
            title={intl.formatMessage({
              defaultMessage: "Create collection",
              description: "window title"
            })}
          />
          <CollectionCreatePage
            errors={createCollectionOpts.data?.collectionCreate.errors || []}
            onBack={() => navigate(collectionListUrl())}
            disabled={createCollectionOpts.loading}
            onSubmit={formData =>
              createCollection({
                variables: {
                  input: {
                    backgroundImage: formData.backgroundImage.value,
                    backgroundImageAlt: formData.backgroundImageAlt,
                    descriptionJson: JSON.stringify(formData.description),
                    isPublished: formData.isPublished,
                    name: formData.name,
                    seo: {
                      description: formData.seoDescription,
                      title: formData.seoTitle
                    }
                  }
                }
              })
            }
            saveButtonBarState={createCollectionOpts.status}
          />
        </>
      )}
    </TypedCollectionCreateMutation>
  );
};
export default CollectionCreate;
