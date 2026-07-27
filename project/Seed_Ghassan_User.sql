-- ============================================================================
-- SQL Server Script: Seed User Ghassan@Rawahel.com
-- Database Target: ASP.NET Core Identity (AspNetUsers, AspNetRoles, AspNetUserRoles)
-- Password: r@12345 (ASP.NET Core Identity PBKDF2 Hash)
-- ============================================================================

SET NOCOUNT ON;
BEGIN TRANSACTION;

BEGIN TRY
    DECLARE @Email NVARCHAR(256) = N'Ghassan@Rawahel.com';
    DECLARE @NormalizedEmail NVARCHAR(256) = UPPER(@Email);
    -- ASP.NET Core Identity Hash for password: r@12345
    DECLARE @PasswordHash NVARCHAR(MAX) = N'AQAAAAEAACcQAAAAEHB5Qqaww2VJao5nWKk6ok36fad3KkyLAzfG2/h0yVIBa6ZpW2Wa8cuxkQiPXjRWHw==';
    DECLARE @RoleName NVARCHAR(256) = N'SuperAdmin';
    DECLARE @NormalizedRoleName NVARCHAR(256) = UPPER(@RoleName);
    
    DECLARE @UserId NVARCHAR(450);
    DECLARE @RoleId NVARCHAR(450);

    -- 1. Ensure SuperAdmin Role Exists
    SELECT @RoleId = Id FROM AspNetRoles WHERE NormalizedName = @NormalizedRoleName;
    
    IF @RoleId IS NULL
    BEGIN
        SET @RoleId = NEWID();
        INSERT INTO AspNetRoles (Id, [Name], NormalizedName, ConcurrencyStamp)
        VALUES (@RoleId, @RoleName, @NormalizedRoleName, NEWID());
    END

    -- 2. Insert or Update User
    SELECT @UserId = Id FROM AspNetUsers WHERE NormalizedEmail = @NormalizedEmail OR NormalizedUserName = @NormalizedEmail;

    IF @UserId IS NULL
    BEGIN
        SET @UserId = NEWID();
        INSERT INTO AspNetUsers (
            Id,
            UserName,
            NormalizedUserName,
            Email,
            NormalizedEmail,
            EmailConfirmed,
            PasswordHash,
            SecurityStamp,
            ConcurrencyStamp,
            PhoneNumberConfirmed,
            TwoFactorEnabled,
            LockoutEnabled,
            AccessFailedCount,
            FullName,
            ArabicDisplayName,
            IsActive,
            CreatedAt,
            UpdatedAt
        )
        VALUES (
            @UserId,
            @Email,
            @NormalizedEmail,
            @Email,
            @NormalizedEmail,
            1, -- EmailConfirmed
            @PasswordHash,
            NEWID(), -- SecurityStamp
            NEWID(), -- ConcurrencyStamp
            0, -- PhoneNumberConfirmed
            0, -- TwoFactorEnabled
            1, -- LockoutEnabled
            0, -- AccessFailedCount
            N'Ghassan',
            N'غسان',
            1, -- IsActive
            GETUTCDATE(),
            GETUTCDATE()
        );
        PRINT 'User Ghassan@Rawahel.com created successfully.';
    END
    ELSE
    BEGIN
        UPDATE AspNetUsers
        SET 
            UserName = @Email,
            NormalizedUserName = @NormalizedEmail,
            Email = @Email,
            NormalizedEmail = @NormalizedEmail,
            EmailConfirmed = 1,
            PasswordHash = @PasswordHash,
            SecurityStamp = NEWID(),
            ConcurrencyStamp = NEWID(),
            IsActive = 1,
            UpdatedAt = GETUTCDATE()
        WHERE Id = @UserId;
        PRINT 'User Ghassan@Rawahel.com updated successfully.';
    END

    -- 3. Assign Role to User
    IF NOT EXISTS (SELECT 1 FROM AspNetUserRoles WHERE UserId = @UserId AND RoleId = @RoleId)
    BEGIN
        INSERT INTO AspNetUserRoles (UserId, RoleId)
        VALUES (@UserId, @RoleId);
        PRINT 'SuperAdmin role assigned to Ghassan@Rawahel.com successfully.';
    END

    COMMIT TRANSACTION;
    PRINT 'Transaction committed successfully.';
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0
        ROLLBACK TRANSACTION;

    DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
    PRINT 'Error occurred: ' + @ErrorMessage;
    THROW;
END CATCH;
