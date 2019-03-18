import S from "@sanity/desk-tool/structure-builder";

const hiddenTypes = ["meta"];

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Meta")
        .child(
          S.editor()
            .id("meta")
            .schemaType("meta")
            .documentId("meta")
        ),
      ...S.documentTypeListItems().filter(
        listItem => !hiddenTypes.includes(listItem.getId())
      ),
    ]);
