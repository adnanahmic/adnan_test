import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';

import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureOnlineOfflineListing } from '../../util/data';
import { EditListingOnlineOfflineForm } from '../../forms';
import { ListingLink } from '../../components';

import css from './EditListingOnlineOfflinePanel.module.css';


const ONLINEOFFLINE_NAME = 'onlineoffline';

const EditListingOnlineOfflinePanel = props => {
  const {
    rootClassName,
    className,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOnlineOfflineListing(listing);
  const { publicData } = currentListing.attributes;


  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingOnlineOfflinePanel.title"
      values={{
        listingTitle: (
          <ListingLink listing={listing}>
            <FormattedMessage id="EditListingOnlineOfflinePanel.listingTitle" />
          </ListingLink>
        ),
      }}
    />
  ) : (
    <FormattedMessage id="EditListingOnlineOfflinePanel.createListingTitle" />
  );

  const onlineoffline = publicData && publicData.onlineoffline;
  const initialValues = { onlineoffline };

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingOnlineOfflineForm
        className={css.form}
        name={ONLINEOFFLINE_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          const { onlineoffline = [] } = values;

          const updatedValues = {
            publicData: { onlineoffline },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
      />
    </div>
  );
};

EditListingOnlineOfflinePanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditListingOnlineOfflinePanel.propTypes = {
  rootClassName: string,
  className: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingOnlineOfflinePanel;
