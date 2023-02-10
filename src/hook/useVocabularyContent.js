import React from "react";
import { Fragment } from "react";
import { useMemo } from "react";

const useVocabularyContent = ({
  content = "",
  vocabularies = [],
  renderContent = (content) => {},
  renderVocabulary = (vocabulary) => {},
  renderEmptyVocabulary = () => {},
}) => {
  const renderData = useMemo(() => {
    if (!content) return null;

    const contents = content.split("*");

    const [fristContent, ...otherContent] = contents;

    const result = [
      <Fragment key={0}>{renderContent(fristContent)}</Fragment>,
      ...otherContent.map((part, index) => {
        return (
          <Fragment key={index + 1}>
            <div style={{ display: "inline" }}>
              {vocabularies[index] ? renderVocabulary(vocabularies[index]) : renderEmptyVocabulary()}
            </div>
            {renderContent(part)}
          </Fragment>
        );
      }),
    ];

    return result;
  }, [vocabularies]);

  return renderData;
};

export default useVocabularyContent;
