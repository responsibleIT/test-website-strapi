import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentBronnen extends Struct.ComponentSchema {
  collectionName: 'components_component_bronnens';
  info: {
    displayName: 'Bronnen';
    icon: 'link';
  };
  attributes: {
    Bron: Schema.Attribute.String & Schema.Attribute.Unique;
  };
}

export interface ComponentButtons extends Struct.ComponentSchema {
  collectionName: 'components_component_buttons';
  info: {
    displayName: 'Buttons';
  };
  attributes: {
    label: Schema.Attribute.String;
    openInNewTab: Schema.Attribute.Boolean;
    style: Schema.Attribute.Enumeration<['primary, ', 'secondary,', 'outline']>;
    url: Schema.Attribute.String;
  };
}

export interface ComponentOnderwijseenheid extends Struct.ComponentSchema {
  collectionName: 'components_component_onderwijseenheids';
  info: {
    displayName: 'Onderwijseenheid';
    icon: 'write';
  };
  attributes: {
    label: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface LayoutSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_sections';
  info: {
    displayName: 'Section';
  };
  attributes: {
    body: Schema.Attribute.Text;
    buttons: Schema.Attribute.Component<'component.buttons', true>;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    type: Schema.Attribute.Enumeration<['hero', 'text ', 'cta', 'gallery']>;
  };
}

export interface NavigationNavItems extends Struct.ComponentSchema {
  collectionName: 'components_navigation_nav_items';
  info: {
    displayName: 'navItems';
  };
  attributes: {
    label: Schema.Attribute.String;
    order: Schema.Attribute.Integer;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'component.bronnen': ComponentBronnen;
      'component.buttons': ComponentButtons;
      'component.onderwijseenheid': ComponentOnderwijseenheid;
      'layout.section': LayoutSection;
      'navigation.nav-items': NavigationNavItems;
    }
  }
}
