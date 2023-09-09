```mermaid
erDiagram
    ACCOUNT ||--o{ USER : "HAS"
    ACCOUNT ||--o{ SUBSCRIPTION : "HAS"
    ACCOUNT ||--o{ PRODUCT : "OFFERS"
    ACCOUNT ||--o{ ABTEST : "RUNS"
    ACCOUNT ||--o{ ERRORLOG : "GENERATES"
    ACCOUNT ||--o{ AUDITLOG : "GENERATES"
    ACCOUNT ||--o{ ACCOUNT_PLATFORM : "INTEGRATES"
    USER ||--o{ ROLE : "HAS"
    USER ||--o{ NOTIFICATION : "HAS"
    USER ||--o{ USERLOG : "GENERATES"
    ROLE ||--o{ ROLE_PERMISSION : "HAS"
    PERMISSION ||--o{ ROLE_PERMISSION : "BELONGS_TO"
    PRODUCT ||--o{ ABTEST : "HAS_TEST"
    PRODUCT ||--o{ PRODUCT_VARIANT : "HAS"
    PRODUCT ||--o{ PRODUCT_IMAGE : "HAS"
    PRODUCT ||--o{ PRODUCT_PUBLISHED_SCOPE : "HAS"
    PRODUCT ||--o{ PRODUCT_PRODUCT_CATEGORY : "HAS"
    PLATFORM ||--o{ PRODUCT : "SUPPORTS"
    PLATFORM ||--o{ ACCOUNT_PLATFORM : "INTEGRATED_BY"
    PUBLISHED_SCOPE ||--o{ PRODUCT_PUBLISHED_SCOPE : "BELONGS_TO"
    PRODUCT_CATEGORY ||--o{ PRODUCT_PRODUCT_CATEGORY : "BELONGS_TO"
    ABTEST ||--o{ PERFORMANCE : "HAS"
    ABTEST ||--o{ STRATEGY : "EMPLOYS"
    SUBSCRIPTION ||--o{ BILLING : "HAS"
    SUBSCRIPTION ||--|{ STRIPE : "USES"

    ACCOUNT {
        string id PK
        string accountName UK
        date created_at
        date updated_at
        boolean isActive
    }

    USER {
        string id PK
        string email UK
        string name
        string hashedPassword
        string roleId FK
        date created_at
        date updated_at
        boolean isActive
    }

    ROLE {
        string id PK
        string name UK
        string description
    }

    PERMISSION {
        string id PK
        string name UK
        string description
    }

    ROLE_PERMISSION {
        string roleId FK
        string permissionId FK
    }

    SUBSCRIPTION {
        string id PK
        string accountId FK
        string plan UK
        date renewalDate
        date created_at
        date updated_at
        boolean autoRenew
    }

    STRIPE {
        string id PK
        string api_key UK
    }

    BILLING {
        string id PK
        string subscriptionId FK
        float amount
        string address
        date billingDate
        date created_at
        date updated_at
    }
 

    PLATFORM {
        string id PK
        string name UK
        string description
    }

    ACCOUNT_PLATFORM {
        string accountId FK
        string platformId FK
        string api_endpoint
        string auth_token UK
        date integrated_at
    }

    PRODUCT {
        string id PK
        string platformId FK
        string accountId FK
        string title
        string body_html
        string vendor
        string slug
        json platform_specific_attributes
        date created_at
        date updated_at
    }

    PUBLISHED_SCOPE {
        string id PK
        string name UK
    }

    PRODUCT_PUBLISHED_SCOPE {
        string productId FK
        string publishedScopeId FK
    }

    PRODUCT_CATEGORY {
        string id PK
        string name UK
        string description
    }

    PRODUCT_PRODUCT_CATEGORY {
        string productId FK
        string productCategoryId FK
    }

    PRODUCT_VARIANT {
        string id PK
        string productId FK
        string title
        float price
        string sku
        boolean taxable
        string barcode
        int grams
        float weight
        string weight_unit
        int inventory_quantity
        boolean requires_shipping
    }

    PRODUCT_IMAGE {
        string id PK
        string productId FK
        string alt
        string src
        date created_at
        date updated_at
    }

    ABTEST {
        string id PK
        string productId FK
        string name UK
        date startDate
        date endDate
        string strategyId FK
        date created_at
        date updated_at
    }

    PERFORMANCE {
        string id PK
        string abtestId FK
        int sessions
        float conversionRate
        float aov
        float revenue
        float revenuePerSession
        float likelihoodToPerform
        date created_at
        date updated_at
    }

    STRATEGY {
        string id PK
        string name UK
        string description
        date created_at
        date updated_at
    }

    NOTIFICATION {
        string id PK
        string userId FK
        boolean emailNotifications
        boolean pushNotifications
        date created_at
        date updated_at
    }

    USERLOG {
        string id PK
        string userId FK
        date timestamp
        string activityType
        string description
        date created_at
    }

    ERRORLOG {
        string id PK
        date timestamp
        string errorType
        string description
        string stackTrace
        date created_at
    }

    AUDITLOG {
        string id PK
        date timestamp
        string entityType
        string entityId
        string actionType
        string changedData
        date created_at
    }
```
