-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "github_id" INTEGER NOT NULL,
    "node_id" TEXT NOT NULL,
    "avatar_url" TEXT,
    "gravatar_id" TEXT,
    "url" TEXT NOT NULL,
    "html_url" TEXT NOT NULL,
    "followers_url" TEXT NOT NULL,
    "following_url" TEXT NOT NULL,
    "gists_url" TEXT NOT NULL,
    "starred_url" TEXT NOT NULL,
    "subscriptions_url" TEXT NOT NULL,
    "organizations_url" TEXT NOT NULL,
    "repos_url" TEXT NOT NULL,
    "events_url" TEXT NOT NULL,
    "received_events_url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "site_admin" BOOLEAN,
    "name" TEXT,
    "company" TEXT,
    "blog" TEXT,
    "location" TEXT,
    "email" TEXT,
    "hireable" BOOLEAN,
    "bio" TEXT,
    "twitter_username" TEXT,
    "public_repos" INTEGER NOT NULL,
    "public_gists" INTEGER NOT NULL,
    "followers" INTEGER NOT NULL,
    "following" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_login_key" ON "Profile"("login");
